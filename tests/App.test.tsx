import React from "react";
import {
  render,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import { FetchMock } from "jest-fetch-mock";

const fetchMock = fetch as FetchMock;

import graphs from "../src/mocks/graphs";
import App from "../src/App";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

afterEach(() => {
  fetchMock.resetMocks();
});

test("App renders", () => {
  render(<App />);
});

test("There is a dropdown with all the available graphs", async () => {
  const fakeGraphsResponse = JSON.stringify(graphs);

  fetchMock.mockResponseOnce(fakeGraphsResponse);

  let container: ReturnType<typeof render> | undefined;
  await act(async () => {
    container = render(<App />);
  });

  if (container) {
    const options = within(container.getByRole("combobox")).getAllByRole(
      "option"
    );

    // subtracting one from the options length to account for the select placeholder
    expect(options.length - 1).toBe(graphs.length);
  }
});

test("Graph selected by dropdown is rendered", async () => {
  const selectedGraph = 2;
  
  fetchMock.mockResponseOnce(JSON.stringify(graphs));
  fetchMock.mockResponseOnce(JSON.stringify(graphs[selectedGraph]));

  const { findByRole, getByText, user } = setup(<App />);

  const combobox = await findByRole('combobox');
  user.selectOptions(combobox, `${selectedGraph}`);

  for (let node of graphs[selectedGraph].nodes) {
    await waitFor(() => {
      expect(getByText(node.name)).toBeInTheDocument();
    });
  }
});

test("Nodes in simple graph are organized into columns", async () => {
  const selectedGraph = 1;

  fetchMock.mockResponseOnce(JSON.stringify(graphs));
  fetchMock.mockResponseOnce(JSON.stringify(graphs[selectedGraph]));

  const { findByRole, findByText, user } = setup(<App />);

  const combobox = await findByRole("combobox");
  user.selectOptions(combobox, `${selectedGraph}`);

  const correctColumns = [["start"], ["foo", "bar"], ["end1", "end2"]];

  for (let idx = 0; idx < correctColumns.length; idx++) {
    const col = correctColumns[idx];
    const otherCols = correctColumns.flatMap((c, i) => (i === idx ? [] : c));
    let parent = await findByText(col[0]);

    while (parent) {
      parent = parent.parentElement as HTMLElement;
      const hasEveryCorrect = col.every((n) => !!within(parent).queryByText(n));
      const doesntHaveAnyOther = otherCols.every(
        (n) => !within(parent).queryByText(n)
      );
      if (hasEveryCorrect && doesntHaveAnyOther) {
        break;
      }
    }
    expect(parent).not.toBeNull();
  }
});

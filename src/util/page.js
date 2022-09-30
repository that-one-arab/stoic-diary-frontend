/**
 * @summary Handles transforming store state section arrays to arrays that are suitable for a `/pages` request body
 * @example
 * const sections = {
    whatWentWrong: [{ value: "Lorem ipsum 1" }],
    whatWentRight: [{ value: "Lorem ipsum 2" }],

    whatCanBeImproved: [{ value: "Lorem ipsum 3" }],
  };

  const res = transformSections(sections);

  console.log(res);
  res => {
    whatWentWrong: ["Lorem ipsum 1"],
    whatWentRight: ["Lorem ipsum 2"],
    whatCanBeImproved: ["Lorem ipsum 3"],
  };
 * */
export function transformSections(page) {
  const SECTION_NAMES = Object.keys(page);
  const res = {};

  SECTION_NAMES.forEach((sectionName) => {
    res[sectionName] = page[sectionName]
      .filter((line) => line.value)
      .map((line) => line.value);
  });

  return res;
}

/**
 * @summary Handles transforming request section arrays to arrays that are suitable for store sections
 * @example
 * const sections = {
    whatWentWrong: [{id: 1, text: "Lorem ipsum 1"}],
    whatWentRight: [{id: 2, text: "Lorem ipsum 2"}],
    whatCanBeImproved: [{id: 3, text: "Lorem ipsum 3"}],
  };

  const res = deTransformSections(sections);

  console.log(res);
  res => {
    whatWentWrong: [{ value: "Lorem ipsum 1" }],
    whatWentRight: [{ value: "Lorem ipsum 2" }],
    whatCanBeImproved: [{ value: "Lorem ipsum 3" }],
  };
 * */
export function deTransformSections(details) {
  const { what_went_wrong, what_went_right, what_can_be_improved } = details;

  return {
    whatWentWrong: what_went_wrong.map((line) => ({
      value: line.text,
      id: line.id,
    })),
    whatWentRight: what_went_right.map((line) => ({
      value: line.text,
      id: line.id,
    })),
    whatCanBeImproved: what_can_be_improved.map((line) => ({
      value: line.text,
      id: line.id,
    })),
  };
}

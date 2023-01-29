module.exports = {
  WEB3: {
    EVENT_LISTENERS_ACTIVE:
      process.env.EVENT_LISTENERS_ACTIVE?.toLocaleLowerCase().trim() === "true",
    PUBLIC_BSC_NODES: process.env.PUBLIC_BSC_NODES || "[]",
    PUBLIC_BSC_TEST_NODES: process.env.PUBLIC_BSC_TEST_NODES || "[]",
  },
};

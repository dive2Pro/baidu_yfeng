export const UN_RELEASE = "UN_RELEASE";
export const RELEASED = "RELEASED";
export const OUT_DATE = "OUT_DATE";
export const NEW_GENE = "NEW_GENE";
export const EXAM_DELETED = "EXAM_DELETED";

export const TEXT_BY_STATE = {
  UN_RELEASE: "未发布",
  RELEASED: "已发布",
  OUT_DATE: "已过期"
};
export const COLOR_BY_STATE = {
  UN_RELEASE: { color: "lightblue" },
  RELEASED: { color: "green" },
  OUT_DATE: { color: "grey", "textDecoration": "line-through" }
};

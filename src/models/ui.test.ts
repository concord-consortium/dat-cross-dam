import { UIModel, UIModelType } from "./ui";

describe("ui model", () => {
  let ui: UIModelType;

  beforeEach(() => {
    ui = UIModel.create({});
  });

  it("has default values", () => {
    expect(ui.displayMode).toBe("Graph");
  });

  it("uses override values", () => {
    ui = UIModel.create({
      displayMode: "Chart"
    });
    expect(ui.displayMode).toBe("Chart");
  });

  it("sets new values", () => {
    ui.setDisplayMode("Simulation");
    expect(ui.displayMode).toBe("Simulation");
  });

});

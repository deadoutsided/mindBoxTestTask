beforeEach(() => {
  cy.visit("/");
  cy.get("input[type=text]").as("todoinp");
  cy.get("div[class*=infoWrapper]").find("p").as("counter");
});

describe("adding Todos", () => {
  it("initial tasks loaded", () => {
    cy.get('div[class*="todoWrapper"]')
      .should("have.length", 4)
      .each(($div, index) => {
        cy.wrap($div)
          .find("p")
          .contains(`task${index + 1}`);
      });
    cy.get("p[class*=todoTitle]").should("have.length", 4);
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 2);
  });

  it("can add todo", () => {
    cy.get("@todoinp").type("task5{enter}");
    cy.get('div[class*="todoWrapper"]')
      .should("have.length", 5)
      .last()
      .find("p[class*=todoTitle]")
      .contains("task5");
  });

  it("can complete todo", () => {
    cy.get("button[class*=todoButton]").last().click();
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 3);
  });

  it("can filter by active", () => {
    cy.get("input[type=radio]").eq(1).check();
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 0);
    cy.get("p[class*=todoTitle]").should("have.length", 2);
  });

  it("can filter by completed", () => {
    cy.get("input[type=radio]").last().check();
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 2);
  });

  it("can filter by all after completed and active", () => {
    cy.get("input[type=radio]").eq(1).check();
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 0);
    cy.get("p[class*=todoTitle]").should("have.length", 2);
    cy.get("input[type=radio]").last().check();
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 2);
    cy.get("input[type=radio]").first().check();
    cy.get("p[class*=todoTitle]").should("have.length", 4);
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 2);
  });

  it("can clear completed todos", () => {
    cy.get("p[class*=todoTitle]").should("have.length", 4);
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 2);
    cy.get("button[class*=infoButtonClear]").click();
    cy.get("p[class*=todoTitle]").should("have.length", 2);
    cy.get("p[class*=todoTitleCompleted]").should("have.length", 0);
  });

  it("active todos counter works", () => {
    cy.get("@todoinp").type("task5{enter}");
    cy.get("@counter").contains("3 items left");
    cy.get("button[class*=todoButton]").last().click();
    cy.get("@counter").contains("2 items left");
    cy.get("button[class*=todoButton]").eq(1).click();
    cy.get("@counter").contains("1 item left");
  });
});

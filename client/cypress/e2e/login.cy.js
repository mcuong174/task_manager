/* eslint-disable no-undef */
const credentials = {
  UserType1: {
    email: "admin@gmail.com",
    password: "123123123",
  },
  UserType2: {
    email: "admin123@gmail.com",
    password: "123123123",
  },
  UserType3: {
    email: "admin@gmail.com",
    password: "123123123@",
  },
};

const logInTheUser = (credential) => {
  cy.get("[data-cy=login-email]").type(credential.email);
  cy.get("[data-cy=login-password]").type(credential.password);
  cy.get("[data-cy=login-btn-submit]").click();
};

describe("Checks login ", () => {
  beforeEach("Log in the user", () => {
    cy.visit("http://localhost:3000/");
    // cy.get('[data-cy=loginModalOpen]').click();
  });

  it("prints error and does not redirect if user does not exist", () => {
    logInTheUser(credentials.nonExisting);
    cy.get("[data-cy=login-password]").should(
      "contain",
      "No user with such login"
    );
    cy.url().should("not.include", "/");
  });

  // it("Login form ", function () {
  //   // const data = { email: "admin@gmail.com", password: "123123123a" };

  //   const data = { email, password };

  //   cy.visit("http://localhost:3000/");

  //   cy.get("[data-cy=signin-button]").click();

  //   cy.get("[data-cy=signin-email-form]").should("be.visible");

  //   cy.get("input[name=email]").type(data.email);

  //   cy.get("input[name=password]").type(`${data.password}{enter}`);

  //   cy.url("http://localhost:3000/tasks");
  // });
});

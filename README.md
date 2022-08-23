# Cypress Mock

Cypress plugin that helps you keep your mocks organised.

## Features

- 🌳 Cypress-like API

- 📄 JSDoced

- 💪 Strongly typed

- 🧩 No dependencies

## Installing

Using npm:

```
$ npm --save-dev install mocked-cypress
```

Using yarn:

```
$ yarn add --dev mocked-cypress
```

## Configuration

Once it's installed, import the module to load custom commands:

```
// support/e2e.ts
import 'mocked-cypress'
```

Typings should be added as follows in tsconfig.json:

```
{
  "compilerOptions": {
    "types": ["cypress", "mocked-cypress"]
  }
}
```

## Motivation

While Cypress guides us very carefully on how to write tests, it does not give us any advice on organising an extensive suite of stubs or mocks. Although the Cypress' documentation encourages us to mix the approaches, to have a few true end-to-end tests, and to stub the rest, **the officialy recommended way of storing stubs as JSONs in fixtures is far away of being scalable.**

In a mature software project, there are too many external dependencies, permutations, and different scenarios to be able to keep enough stubs in static and non-programmable structures such as JSON. And to keep them all always up-to-date. Undoable.

Been there done that, trust me.

My plugin comes with a helping hand.

## Usage

_Check the example project in `example/` to learn how to use it in practice_

### `cy.mock()`

First, you must define a `Mock` instance:

```
import Mock from 'mocked-cypress';

export const getToken = Mock.new({
    route: '/auth/token',
    method: 'POST',
    scenario: {
        'existing user': {
            statusCode: 200,
            body: {
                token 'JWT-Token',
                role: 'USER'
            }
        },
        unauthorized: { /** (...) */ },
        forbidden: { /** (...) */ },
        'internal server error': { /** (...) */ },
    }
});
```

then, we can use it in tests:

```
import { getToken } from '@mocks';

describe('Login', () => {
    // (...)

    it('redirects to dashboard page when user is an existing one', () => {
        // We use the predefined scenario
        cy.mock(getToken, 'existing user');

        cy.login();
        cy.get('[data-test-id="dashboard"]').should('be.visible');
    });

    it('redirects to registration page when user is a new one', () => {
        // Here, we define a stub response explicitly
        cy.mock(getToken, { statusCode: 200, body: { token: 'JWT-TOKEN', role: 'NEW' } });

        cy.login();
        cy.get('[data-test-id="registration"]').should('be.visible');
    });

    it('shows error message when failed to authenticate the user', () => {
        // Again, we use another predefined scenario
        cy.mock(getToken, 'internal server error');

        cy.login();
        cy.get('[data-test-id="error-message"]').should('be.visible');
    });
});
```

As simple as that. But there's more!

Sometimes, there are so many different possible scenarios that we don't want to define static objects for each test. We want to use a function that generates the body accordingly to the passed arguments. To do that, we must define `Mock` with `getBody` property:

```
import Mock from 'mocked-cypress';

export const getTransactions = Mock.new({
    route: '/webline/transactions',
    method: "GET",
    getBody: (args: { date?: Date, logo?: string }[]) => ({ /** (...) */ });
    scenario: {
        empty: [],
    }
});
```

and now, to use `getBody()` you must pass `args` only:

```
import { getTransactions } from '@mocks';

describe('Transactions', () => {
    // (...)

    it('shows transactions grouped by date', () => {
        const transactionDate = new Date(1995, 2, 24);

        cy.mock(getTransactions, {
            statusCode: 200,
            args: [
                { date: transactionDate },
                { date: transactionDate },
            ]
        });

        cy.get('[data-test-id="transactions-group-24-03-1995"]')
            .should('be.visible');
    });

    it('shows merchant logo if presents', () => {
        cy.mock(getTransactions, {
            statusCode: 200,
            args: [
                {
                    date: new Date(1995, 2, 24)
                    logo: 'logo.png'
                },
            ]
        });

        cy.get('[data-test-id="transaction-24-03-1995"]').within(() => {
            cy.contains('[data-test-id="transaction-logo"]')
                .should('be.visible');
        });
    });
});
```

Voilà! 🎉

### `cy.wait()`

To wait for a request to complete, a `Mock` instance must have defined `alias` property:

```
import Mock from 'mocked-cypress';

export const getToken = Mock.new({
    route: '/auth/token',
    method: 'POST',
    alias: 'getToken' // It can be `getToken` or `@getToken`, works both ways
    scenario: {
        success:  { /** (...) */ }
    }
}
```

```
import { getToken } from '@mocks';

describe('Login', () => {
    // (...)

    it('calls to authenticate user when submitted credentials', () => {
        cy.mock(getToken, 'success');

        cy.login();
        cy.get(getToken).then(({ request }) => {
            expect(request.body)..to.have.property("OTP", "1111");
        });
    });
});
```

## 💙 Contributing

PRs are welcome!

Found a bug? Create an Issue.

💖 Like this project ?
Leave a ⭐ If you think this project is cool.

Share with the world ✨

👨‍💻 Author
Marek Siemieniuk-Morawski

🍁 MIT License

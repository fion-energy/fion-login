> [!WARNING]
> The login code is moved to the main Zitadel repository.
> Follow these steps to stay up-to-date.

1. Make sure your zitadel/typescript repo is in sync with the origin
2. Fork the [zitadel/zitadel](https://github.com/zitadel/zitadel/fork)
3. Clone your Zitadel fork `git clone https://github.com/<your-owner>/zitadel.git`
4. Change directory to your Zitadel forks root.
5. Check out a new branch for your Login code changes: `git checkout -b login-move`
6. Add your TypeScript repo Fork as a remote of your Zitadel repo fork: `git remote add login-mirror https://github.com/<your-owner>/typescript.git`
7. Fetch your Login code into the Zitadel fork: `git fetch login-mirror <your-typescript-fork-branch>`
8. Merge your changes into the current branch: `git subtree merge --prefix=apps/login login-mirror/<your-typescript-fork-branch>`
9. Resolve potential conflicts, the push your changes: `git push`
10. Read the [CONTRIBUTING.md about how to develop the Login](https://github.com/zitadel/zitadel/blob/main/CONTRIBUTING.md#contribute-to-login).
11. Optionally open a pull request to zitadel/zitadel
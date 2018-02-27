# Pre-Commit Githooks

These are my git hooks for pre-commit. They are modified based on the project, of course. Some functionality that is included:

* Reject commits to the `master` or `develop` branches.
* Catch `debugger`s, `console.log()`s, and other pesky stuff one doesn't usually want in a commit.
* Alert user if git garbage (`>>>HEAD>>>`) is left in the code to be committed.
* Run the linting, tests, and [flow](https://flow.org/) (note that these require configuration and setup.)

Feedback and pull requests are welcomed!

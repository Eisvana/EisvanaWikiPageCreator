+## HTML
The page body always starts with a container div.

The first element in that container is the `<nav>`, as well as the `<h1>` and `<dialog>` elements.

The `<main>` element is a `main.columns` element, which has two `div.column` elements.

The left one has a single `div.table`, with other `<div>` elements adding functionality like gallery or action buttons.

The right one only has `div.wikitext` children, which then contain the actual wikitext.

Here's a table visualising the structure:

| Left      | Right        |
|-----------|--------------|
| div.table | div.wikitext |

Any data that's directly related to user input should be wrapped in an `output` element, ideally with id or name attributes. The `name` attribute automatically distributes data to all output elements of the same name.
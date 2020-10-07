# Features

- Powerful multi-window workspace
  - Includes Command Palette?
  - Serialization and deserialization of workspace to JSON (good for electron app)

## TODOs/Notes

Ser/de is not working for RDFine resources even though it exports entire tree

It appears to be reloading the data from JSON as a plain object in the form of the literals outputted, but is not pulling in the proper code which Wraps it in a Proxy

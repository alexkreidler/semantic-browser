# Features

- Powerful multi-window workspace
  - Includes Command Palette?
  - Serialization and deserialization of workspace to JSON (good for electron app)

## TODOs/Notes

Ser/de is not working for RDFine resources even though it exports entire tree

It appears to be reloading the data from JSON as a plain object in the form of the literals outputted, but is not pulling in the proper code which Wraps it in a Proxy

Guidelines for Transitions:

- Should be easily serializable and transparent
- Should be understood to properly instantiate code on other end
- May depend on some shared data (e.g. an rdf-ext dataset) but that should be
  - Documented
  - Able to be exported separately than view/vis configs

Will MobX work for modifying the dataset itself and propagating updates to listeners? Probably! See issue: https://github.com/mobxjs/mobx/issues/1468

With proper sharing of the `Alcaeus` (specifically the `ResourceStore`) instances of classes, one could use `loadResource` with cache:true to simply fetch from catch given an id.

If the `graph` in `ResourceStore` always matches the Resource's IRI, then ser/de of Alcaeus could be easy:

serialize: a list of all unique `graph` items
deser: alceus.loadResource for each item

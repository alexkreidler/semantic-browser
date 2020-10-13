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

However this assumes that the external state/store of data (each URL from the graphs) is available and the same.

Otherwise, we could export each named graph to Turtle, or other formats via RDF/JS interface.

Would need access to internal dataset, that's OK

Could create a version of rdf-dataset-indexed or any rdf/js Dataset implementation that acted like an Atom and indicated when data was updated. However would this cause every .get call to be run?

Also the inconsistency between the graph and object data model of JS means perf could be problem. I see lots of iteration in the N3Store.js implementation.

For now: work on Collection using passed objects.

## About indexed dataset

rdf-ext uses rdf-dataset-indexed which uses an old forked version of N3. That old version still requires client libraries to implement equals on the quads, which jsonld.js doesn't do.

Let's see if Graphy.js works better
## Get operations by ID

I have multiple "windows" in my app, and a key way I'm managing them is by having a state tree that can be serialized and deserialized. However this only works with plain JS object rather than code.

So if I pass a HydraResource or an Operation between windows, it won't be able to be deserialized. However, for the `HydraResource` I can simply use `Alcaeus.loadResource(iri)`.

Operations can have IRIs, just like anything else (the Event API example on Markus Lanthaler's website shows an example using blank node ids).

I'm wondering if there's a way to get an operation by ID from the `ApiDocumentation`. There's definitely no way provided for by the Hydra spec, and many `hydra:Operation`s are only defined in the ApiDocumentation, so wouldn't be otherwise dereferenceable. However, assuming I'm able to use a shared version of `Alcaeus` which contains the `apiDocumentation`s and that the operation ID is in that graph, would this be possible?

One issue I can forsee is that operations are defined on classes, so the client wouldn't really know which instance of the class to apply it to with just an operation retrieved by ID. This seems incompatible with the current `target` field. One idea is:

```ts
const res: HydraResource;
const op: Operation;

res.apply(op);
```

In our representation of Operation we could include a field supportedClasses that was basically the inverse of supportedOperation. If the resource provided wasn't of the type in supportedClasses we could throw an error.

This is somewhat different from what seems the traditional model: e.g. have a resource and try to discover operations in that you have a resource (or at least the ApiDocumentation for it) and you have an operation. However it still to me seems to be compliant with the spec in that operations only work on the classes they are defined for.

Currently the way I would go about this is to either:

- locate the operation just using graph tools via RDF/JS interfaces or JSON-LD from the ApiDocumentation (this could be done by getting apiDocs URL, getting that named graph from `dataset` and searching it for the IRI)
- Use the resource's IRI and some data about the operation (e.g. method, etc) to find the given operation using `getOperationsDeep` as usual.

## Simplest way to do this now:

E.g.

```ts
resource.getOperationsDeep().filter((op: Operation) => {
  // op.target == resource
  op.supportedOperation.id;
});
```

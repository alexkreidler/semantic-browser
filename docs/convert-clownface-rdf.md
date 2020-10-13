# Convert clownface pointer back to RDF/JS representation

This would help with interoperability with other libraries. Effectively we could output an object like this:
```
type RDFRepresentation = {
    dataset: Dataset
    term: Term
}
```
For each of the `terms` in the pointer. It may be worth providing options to filter out
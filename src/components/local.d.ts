// All imports need to go inside the module declaration
declare module "@graphy/memory.dataset.fast" {
  import { Quad as RDFQuad } from "rdf-js"
  import { Dataset } from "rdf-js"
  export type AnyTerm = {
    termType: "NamedNode" | "BlankNode" | "Literal" | "DefaultGraph"
    value: string
    datatype?: AnyTerm
    language?: string
  }
  export type AnyQuad = {
    subject: AnyTerm
    predicate: AnyTerm
    object: AnyTerm
    graph?: AnyTerm
  }
  export type Quad = {}
  export class FastDataset {
    readonly size: number;

    /** create an iterator to traverse each quad in this. */
    [Symbol.iterator](): Iterator<RDFQuad, any, undefined>

    /**create a new FastDataset by applying the RDF Dataset Normalization Algorithm (URDNA2015). If you want isomorphism to hold under the usual FastDataset methods, you should use this method on both dataset instances prior to testing .equals(), .contains(), .disjoint(), and prior to using .union(), .intersection(), .minus(), and .difference(). */
    canonicalize(): FastDataset

    /**add a single quad to the dataset; will only succeed if the quad is not already present. */
    add(quad: AnyQuad)

    /**add quads to the dataset; will only add each quad that is not already present. */
    addAll(quads: Dataset | AnyQuad[]): this

    /** add quads to the dataset; will only add each quad that is not already present. Bypass the internal overhead of checking and needlessly converting each quad to graphy-safe objects. Notice that quads must be an Iterable sequence of graphy Quads. */
    addQuads(quads: Iterable<Quad>): number

    /**delete the given quad from the dataset if it exists. */
    delete(quad: AnyQuad): this

    /** delete the given quads from the dataset if they exist. */
    deleteQuads(quads: Quad)

    /** remove all quads from the dataset. */
    clear(): undefined

    /*tests if this contains the given quad.*/
    has(quad: AnyQuad): boolean

    match(subject?: AnyTerm, predicate?: AnyTerm, object?: AnyTerm, graph?: AnyTerm): FastDataset
    //TODO: add more types
  }
  export default function create(): FastDataset

  //     .size – number of quads in the dataset.
  // Prototype Methods –
  //     Iterators
  //         * [Symbol.iterator](...) – instances are iterable
  //     Canonicalization
  //         .canonicalize(...)
  //     Set Mutators
  //         .add(...)
  //         .addAll(...)
  //         .addQuads(...)
  //         .delete(...)
  //         .deleteQuads(...)
  //         .clear(...) – remove all quads from the dataset
  //     Set Analogues
  //         .has(...) – test if the dataset has a given quad
  //     Set Algebra Booleans
  //         .equals(...) – A = B
  //         .contains(...) – (A ∩ B) = B
  //         .disjoint(...) – (A ∩ B) = Ø
  //     Set Algebra Primitives
  //         .union(...) – A ∪ B
  //         .intersection(...) – A ∩ B
  //     Set Algebra Derivatives
  //         .minus(...) – A - (A ∩ B)
  //         .difference(...) – (A - (A ∩ B)) ∪ (B - (A ∩ B))
  //     Selection
  //         .match(...)
}

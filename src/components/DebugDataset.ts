import { BaseQuad, BlankNode, Dataset, DefaultGraph, Literal, NamedNode, Quad, Stream, Term, Variable } from "rdf-js"
import dataset, { AnyQuad, FastDataset } from "@graphy/memory.dataset.fast"

/* eslint-disable */
export class DebugDataset implements Dataset {
  // CORE
  size = 0
  ds: FastDataset = dataset()

  add(quad: Quad): this {
    console.log("DebugDataset:  add")
    return this.ds.add(quad as AnyQuad)
  }
  delete(quad: Quad): this {
    console.log("DebugDataset:  delete")
    this.ds.delete(quad as AnyQuad)
    return this
  }
  has(quad: Quad): boolean {
    console.log("DebugDataset:  has")
    return this.ds.has(quad as AnyQuad)
  }
  [Symbol.iterator](): Iterator<Quad, any, undefined> {
    // console.log("DebugDataset:  [Symbol.iterator]")
    return this.ds[Symbol.iterator]()
  }

  // Extended
  addAll(quads: Dataset<Quad, Quad> | Quad[]): this {
    console.log("DebugDataset:  addAll")
    this.ds.addAll(quads as AnyQuad[])
    return this
  }
  contains(other: Dataset<Quad, Quad>): boolean {
    console.log("DebugDataset:  contains")
    throw new Error("Method not implemented.")
  }
  deleteMatches(subject?: Term, predicate?: Term, object?: Term, graph?: Term): this {
    console.log("DebugDataset:  deleteMatches")
    throw new Error("Method not implemented.")
  }
  difference(other: Dataset<Quad, Quad>): Dataset<Quad, Quad> {
    console.log("DebugDataset:  difference")
    throw new Error("Method not implemented.")
  }
  equals(other: Dataset<Quad, Quad>): boolean {
    console.log("DebugDataset:  equals")
    throw new Error("Method not implemented.")
  }
  every(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => boolean): boolean {
    console.log("DebugDataset:  every(iteratee: ")
    throw new Error("Method not implemented.")
  }
  filter(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => boolean): Dataset<Quad, Quad> {
    console.log("DebugDataset:  filter(iteratee: ")
    throw new Error("Method not implemented.")
  }
  forEach(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => void): void {
    console.log("DebugDataset:  forEach(iteratee: ")
    throw new Error("Method not implemented.")
  }
  import(stream: Stream<Quad>): Promise<this> {
    console.log("DebugDataset:  import")
    throw new Error("Method not implemented.")
  }
  intersection(other: Dataset<Quad, Quad>): this {
    console.log("DebugDataset:  intersection")
    throw new Error("Method not implemented.")
  }
  map(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => Quad): Dataset<Quad, Quad> {
    console.log("DebugDataset:  map(iteratee: ")
    throw new Error("Method not implemented.")
  }
  reduce<A = any>(iteratee: (accumulator: A, quad: Quad, dataset: Dataset<Quad, Quad>) => A, initialValue?: A): A {
    console.log("DebugDataset:  reduce<A = any>(iteratee: ")
    throw new Error("Method not implemented.")
  }
  some(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => boolean): boolean {
    console.log("DebugDataset:  some(iteratee: ")
    throw new Error("Method not implemented.")
  }
  toArray(): Quad[] {
    console.log("DebugDataset:  toArray")
    throw new Error("Method not implemented.")
  }
  toCanonical(): string {
    console.log("DebugDataset:  toCanonical")
    throw new Error("Method not implemented.")
  }
  toStream(): Stream<Quad> {
    console.log("DebugDataset:  toStream")
    throw new Error("Method not implemented.")
  }
  toString(): string {
    console.log("DebugDataset:  toString")
    throw new Error("Method not implemented.")
  }
  union(quads: Dataset<Quad, Quad>): Dataset<Quad, Quad> {
    console.log("DebugDataset:  union")
    throw new Error("Method not implemented.")
  }
  match(
    subject?: BaseQuad | NamedNode<string> | BlankNode | Literal | Variable | DefaultGraph | null,
    predicate?: BaseQuad | NamedNode<string> | BlankNode | Literal | Variable | DefaultGraph | null,
    object?: BaseQuad | NamedNode<string> | BlankNode | Literal | Variable | DefaultGraph | null,
    graph?: BaseQuad | NamedNode<string> | BlankNode | Literal | Variable | DefaultGraph | null
  ): Dataset<Quad, Quad> {
    // console.log(
    //   `DebugDataset: match(subject: ${JSON.stringify(subject)} predicate: ${JSON.stringify(
    //     predicate
    //   )} object: ${JSON.stringify(object)} graph: ${JSON.stringify(graph)})`
    // )
    //@ts-ignore
    return this.ds.match(subject, predicate, object, graph)
    // throw new Error("Method not implemented.")
  }
}

import { BigInt } from "@graphprotocol/graph-ts"
import { Memories, NewMemoryCreated } from "../generated/Memories/Memories"
import { Memory } from "../generated/schema"

export function handleNewMemoryCreated(event: NewMemoryCreated): void {
  let entity = Memory.load(event.params.memoryId.toHex())
  if (!entity) {
    entity = new Memory(event.params.memoryId.toHex())
    entity.memoryId = event.params.memoryId
    entity.imageUrl = event.params.imageUrl
    entity.imageDate = event.params.imageDate
    entity.owner = event.params.owner
  }
  entity.save()

}
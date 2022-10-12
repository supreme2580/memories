// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Memories {

    event NewMemoryCreated(
        bytes32 memoryId,
        string imageUrl,
        string imageDate,
        address owner
    );

    struct NewMemory {
        bytes32 memoryId;
        string imageUrl;
        string imageDate;
        address owner;
    }

    mapping (bytes32 => NewMemory) public idToMemory;

    function createNewMemory(
        string calldata imageUrl,
        string calldata imageDate
    ) external {
        bytes32 memoryId = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                imageUrl,
                imageDate
            )
        );
        idToMemory[memoryId] = NewMemory(
            memoryId,
            imageUrl,
            imageDate,
            msg.sender
        );
        emit NewMemoryCreated(memoryId, imageUrl, imageDate, msg.sender);
    }

}
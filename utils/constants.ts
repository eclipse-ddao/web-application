export const ADD_DATA_DAO_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "ContractCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "createEclipseDataDao",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "getEclipse",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const ADD_MEMBER_DAO_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_bigFiles",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bounty",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sizeInGb",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_bigFilesIds",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_selectedProposals",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bigFileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "acceptedSp",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "dealAmount",
        type: "uint256",
      },
    ],
    name: "acceptProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "bounty",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sizeInGb",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startedAt",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "spAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct EclipseDataDao.BigFile",
        name: "data",
        type: "tuple",
      },
    ],
    name: "addBigFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newMember",
        type: "address",
      },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getBigFile",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "bounty",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sizeInGb",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startedAt",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "spAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct EclipseDataDao.BigFile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getSelectedProposal",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "isMember",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const ADDRESS_CONTRACT = "0x856782ec5114136451e0D70f559733710Bc13b94";
// export const ADDRESS_CONTRACT = "0xef5C9EB389D8a78029c41ADA6a66844e1C0bC642";

export const RANDOMSTRING = "eclipsetest";

export const LH_KEY = "4735c24d-5e77-42cd-8f00-604c8fe81a36";

export const CID = "QmRjtZkAKxUGUT2s4g6AzGKTV1mbzm9cVR4NxYYpsJXcio";

export const getStatus = (status: number) => {
  switch (status) {
    case 0: {
      return "All";
    }
    case 1: {
      return "Open";
    }
    case 2: {
      return "Selected";
    }
    case 3: {
      return "Closed";
    }
    default:
      return "";
  }
};

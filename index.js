document.addEventListener("DOMContentLoaded", async () => {
  console.log("ahoyy");
  console.log("================");

  async function connectToMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to MetaMask");
      } catch (error) {
        console.error("Error connecting :", error);
      }
    } else {
      console.error("MetaMask not detected. install");
    }
  }

  connectToMetaMask();

  // Replace with your actual GaslessDAO contract address and ABI
  const contractAddress = "0xc06933513fdda48Eb7F6BB94F24F5741aef232B6";
  const daoContractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "createProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256",
        },
      ],
      name: "executeProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "proposer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      name: "ProposalCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "executor",
          type: "address",
        },
      ],
      name: "ProposalExecuted",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_support",
          type: "bool",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "voter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "support",
          type: "bool",
        },
      ],
      name: "Voted",
      type: "event",
    },
    {
      inputs: [],
      name: "owner",
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
      inputs: [],
      name: "proposalCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
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
      name: "proposals",
      outputs: [
        {
          internalType: "address",
          name: "proposer",
          type: "address",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "forVotes",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "againstVotes",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "executed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const gaslessDAOContract = new ethers.Contract(
    contractAddress,
    daoContractABI,
    signer
  );

  async function createProposal(description) {
    const tx = await gaslessDAOContract.createProposal(description);
    await tx.wait();
    console.log("proposal created hehe!");
  }

  async function vote(proposalId, support) {
    const tx = await gaslessDAOContract.vote(proposalId, support);
    await tx.wait();
    console.log("vote submitted hehe!");
  }

  async function executeProposal(proposalId) {
    const tx = await gaslessDAOContract.executeProposal(proposalId);
    await tx.wait();
    console.log("proposal executed hehe!");
  }

  async function transferTokens(to, amount) {
    const tx = await gaslessDAOContract.transferTokens(
      to,
      ethers.utils.parseEther(amount)
    );
    await tx.wait();
    console.log("tokens transferred hehe!");
  }
});

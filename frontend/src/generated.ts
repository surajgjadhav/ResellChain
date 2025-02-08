import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ResellMarketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const resellMarketplaceAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'rtNFT', internalType: 'address', type: 'address' },
      { name: 'usdc', internalType: 'address', type: 'address' },
      { name: 'usdcUsdPF', internalType: 'address', type: 'address' },
      { name: 'pricefeedHeartbeat', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'ResellMarketplace__InsufficientAmount' },
  { type: 'error', inputs: [], name: 'ResellMarketplace__InvalidRoundId' },
  {
    type: 'error',
    inputs: [],
    name: 'ResellMarketplace__OnlyOwnerCanListProduct',
  },
  {
    type: 'error',
    inputs: [],
    name: 'ResellMarketplace__OnlyResellTokenSupported',
  },
  { type: 'error', inputs: [], name: 'ResellMarketplace__PriceFeedDdosed' },
  { type: 'error', inputs: [], name: 'ResellMarketplace__StalePriceFeed' },
  { type: 'error', inputs: [], name: 'ResellMarketplace__TokenNotListed' },
  { type: 'error', inputs: [], name: 'ResellMarketplace__TransferFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductListed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductSold',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'delistProduct',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getListedNfts',
    outputs: [
      {
        name: '',
        internalType: 'struct ResellMarketplace.NFTDetails[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenURI', internalType: 'string', type: 'string' },
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'listed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMyNfts',
    outputs: [
      {
        name: '',
        internalType: 'struct ResellMarketplace.NFTDetails[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenURI', internalType: 'string', type: 'string' },
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'listed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getNftDetails',
    outputs: [
      {
        name: 'nftDetails',
        internalType: 'struct ResellMarketplace.NFTDetails',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenURI', internalType: 'string', type: 'string' },
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'listed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getUsdcPriceInUsd',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getValuationInUsdc',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'listProduct',
    outputs: [
      {
        name: 'tokenDetails',
        internalType: 'struct ResellNFT.TokenDetails',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintAndListProduct',
    outputs: [
      {
        name: 'tokenDetails',
        internalType: 'struct ResellNFT.TokenDetails',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintProduct',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'usdcUsdAggregatorAddress',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'usdcUsdFeedHeartbeat',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setUsdcUsdPriceFeedDetails',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateProductPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ResellNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const resellNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ProductPriceDetails__InvalidPrice' },
  { type: 'error', inputs: [], name: 'ProductPriceDetails__InvalidToken' },
  { type: 'error', inputs: [], name: 'ResellNFT__OnlyITokenOwnerAllowded' },
  {
    type: 'error',
    inputs: [],
    name: 'ResellNFT__OnlyIssuerOrItselfIsAllowded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'updatedPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'modifiedBy',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PriceUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'issuer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'SetIssuer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct ResellNFT.TokenDetails',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenPrice',
    outputs: [{ name: 'tokenPrice', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintAndUpdateProductPrice',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'issuer', internalType: 'address', type: 'address' }],
    name: 'setIssuer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateProductPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__
 */
export const useReadResellMarketplace = /*#__PURE__*/ createUseReadContract({
  abi: resellMarketplaceAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"getListedNfts"`
 */
export const useReadResellMarketplaceGetListedNfts =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'getListedNfts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"getMyNfts"`
 */
export const useReadResellMarketplaceGetMyNfts =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'getMyNfts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"getNftDetails"`
 */
export const useReadResellMarketplaceGetNftDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'getNftDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"getUsdcPriceInUsd"`
 */
export const useReadResellMarketplaceGetUsdcPriceInUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'getUsdcPriceInUsd',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"getValuationInUsdc"`
 */
export const useReadResellMarketplaceGetValuationInUsdc =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'getValuationInUsdc',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"owner"`
 */
export const useReadResellMarketplaceOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: resellMarketplaceAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__
 */
export const useWriteResellMarketplace = /*#__PURE__*/ createUseWriteContract({
  abi: resellMarketplaceAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"buy"`
 */
export const useWriteResellMarketplaceBuy =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'buy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"delistProduct"`
 */
export const useWriteResellMarketplaceDelistProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'delistProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"listProduct"`
 */
export const useWriteResellMarketplaceListProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'listProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"mintAndListProduct"`
 */
export const useWriteResellMarketplaceMintAndListProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'mintAndListProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"mintProduct"`
 */
export const useWriteResellMarketplaceMintProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'mintProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteResellMarketplaceOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteResellMarketplaceRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"setUsdcUsdPriceFeedDetails"`
 */
export const useWriteResellMarketplaceSetUsdcUsdPriceFeedDetails =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'setUsdcUsdPriceFeedDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteResellMarketplaceTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"updateProductPrice"`
 */
export const useWriteResellMarketplaceUpdateProductPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellMarketplaceAbi,
    functionName: 'updateProductPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__
 */
export const useSimulateResellMarketplace =
  /*#__PURE__*/ createUseSimulateContract({ abi: resellMarketplaceAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"buy"`
 */
export const useSimulateResellMarketplaceBuy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'buy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"delistProduct"`
 */
export const useSimulateResellMarketplaceDelistProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'delistProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"listProduct"`
 */
export const useSimulateResellMarketplaceListProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'listProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"mintAndListProduct"`
 */
export const useSimulateResellMarketplaceMintAndListProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'mintAndListProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"mintProduct"`
 */
export const useSimulateResellMarketplaceMintProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'mintProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateResellMarketplaceOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateResellMarketplaceRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"setUsdcUsdPriceFeedDetails"`
 */
export const useSimulateResellMarketplaceSetUsdcUsdPriceFeedDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'setUsdcUsdPriceFeedDetails',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateResellMarketplaceTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `functionName` set to `"updateProductPrice"`
 */
export const useSimulateResellMarketplaceUpdateProductPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellMarketplaceAbi,
    functionName: 'updateProductPrice',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellMarketplaceAbi}__
 */
export const useWatchResellMarketplaceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: resellMarketplaceAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchResellMarketplaceOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellMarketplaceAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `eventName` set to `"ProductListed"`
 */
export const useWatchResellMarketplaceProductListedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellMarketplaceAbi,
    eventName: 'ProductListed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `eventName` set to `"ProductMinted"`
 */
export const useWatchResellMarketplaceProductMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellMarketplaceAbi,
    eventName: 'ProductMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellMarketplaceAbi}__ and `eventName` set to `"ProductSold"`
 */
export const useWatchResellMarketplaceProductSoldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellMarketplaceAbi,
    eventName: 'ProductSold',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__
 */
export const useReadResellNft = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadResellNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadResellNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"getTokenDetails"`
 */
export const useReadResellNftGetTokenDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: resellNftAbi,
    functionName: 'getTokenDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"getTokenPrice"`
 */
export const useReadResellNftGetTokenPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: resellNftAbi,
    functionName: 'getTokenPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadResellNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: resellNftAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadResellNftName = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadResellNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadResellNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadResellNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: resellNftAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadResellNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadResellNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: resellNftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__
 */
export const useWriteResellNft = /*#__PURE__*/ createUseWriteContract({
  abi: resellNftAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteResellNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: resellNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"mintAndUpdateProductPrice"`
 */
export const useWriteResellNftMintAndUpdateProductPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'mintAndUpdateProductPrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteResellNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteResellNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteResellNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"setIssuer"`
 */
export const useWriteResellNftSetIssuer = /*#__PURE__*/ createUseWriteContract({
  abi: resellNftAbi,
  functionName: 'setIssuer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteResellNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteResellNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"updateProductPrice"`
 */
export const useWriteResellNftUpdateProductPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: resellNftAbi,
    functionName: 'updateProductPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__
 */
export const useSimulateResellNft = /*#__PURE__*/ createUseSimulateContract({
  abi: resellNftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateResellNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"mintAndUpdateProductPrice"`
 */
export const useSimulateResellNftMintAndUpdateProductPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'mintAndUpdateProductPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateResellNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateResellNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateResellNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"setIssuer"`
 */
export const useSimulateResellNftSetIssuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'setIssuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateResellNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateResellNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link resellNftAbi}__ and `functionName` set to `"updateProductPrice"`
 */
export const useSimulateResellNftUpdateProductPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: resellNftAbi,
    functionName: 'updateProductPrice',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__
 */
export const useWatchResellNftEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: resellNftAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchResellNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchResellNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchResellNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchResellNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchResellNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"PriceUpdated"`
 */
export const useWatchResellNftPriceUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'PriceUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"ProductAdded"`
 */
export const useWatchResellNftProductAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'ProductAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"SetIssuer"`
 */
export const useWatchResellNftSetIssuerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'SetIssuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link resellNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchResellNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: resellNftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

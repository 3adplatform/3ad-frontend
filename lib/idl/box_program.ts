export const IDL = {
  "version": "0.1.0",
  "name": "box_program",
  "instructions": [
    {
      "name": "createBox",
      "accounts": [
        {
          "name": "box",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "commissionRate",
          "type": "u8"
        }
      ]
    },
    {
      "name": "openBox",
      "accounts": [
        {
          "name": "box",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "opener",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Box",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "commissionRate",
            "type": "u8"
          },
          {
            "name": "isOpened",
            "type": "bool"
          }
        ]
      }
    }
  ]
}; 
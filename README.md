# Commitlint Plugin Multiscope

A commitlint plugin that supports multiple scopes

## Getting Started

```shell
npm install -D commitlint-plugin-multiscope
```

And configure `commitlint.config.js` to use multiscope plugin.

```javascript
module.exports = {
  plugins: ['commitlint-plugin-multiscope'],
  rules: {
    'multiscope/multiscope': [2, 'always', {
      delimiter: ',',
      enum: [
        'api',
        'app',
        'web',
      ],
      case: 'lower-case'
    }]
  }
}
```

## `options: MultiScopeOptions`

- `delimiter?: string | RegExp`
  - specify delimiter that scopes joined by
  - default: `,`
- `enum?: string[]`
  - condition: `scope` is found in `enum`
  - default: `[]`
- `case?: string`
  - condition: `scope` is in  `case`
  - default: `lower-case`

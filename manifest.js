/* eslint-disable camelcase */
const connectorOIDC = {
  name: 'OIDC Connector',
  description: 'OIDC Connector',
  connectorId: 'connectorOIDC',
  serviceName: 'connector-oidc',
  connectorType: 'mfa',
  connectorCategories: [{ name: 'Operate', value: 'operate' }],
  connectorDetails: 'This is a OIDC connector which redirects to an IdP.',
  detailImage: null,
  metadata: {
    colors: {
      canvas: '#5077c5',
      dark: '#2b355b',
      canvasText: '#FFFFFF',
    },
    logos: {
      canvas: {
        imageFileName: 'pingidentity.svg',
      },
    },
  },

  sections: [{ name: 'General', value: 'general', default: true }],
  flowSections: [{ name: 'General', value: 'general' }],

  properties: {
    authType: {
      value: 'openId',
    },
    showPoweredBy: {
      preferredControlType: 'toggleSwitch',
      value: false,
    },
    skipButtonPress: {
      preferredControlType: 'toggleSwitch',
      value: true,
    },
    openId: {
      properties: {
        issuerUrl: {
          preferredControlType: 'textField',
          value: '',
        },
        providerName: {
          displayName: 'Provider Name',
          preferredControlType: 'textField',
          value: '',
        },
        skRedirectUri: {
          preferredControlType: 'textField',
          disabled: true,
          initializeValue: 'SINGULARKEY_REDIRECT_URI',
          copyToClip: true,
        },
        clientId: {
          displayName: 'Client ID',
          preferredControlType: 'textField',
        },
        clientSecret: {
          displayName: 'Client Secret',
          preferredControlType: 'textField',
          hashedVisibility: true,
        },
        scope: {
          preferredControlType: 'textField',
          requiredValue: 'openid',
          value: 'openid',
          disabled: true,
        },
        grant: { value: 'authorizationCode' },
        authorizationEndpoint: {
          preferredControlType: 'textField',
          value: '',
        },
        authorizationParams: { value: ['clientId', 'redirect_uri'] },
        tokenEndpoint: {
          preferredControlType: 'textField',
          value: '',
        },
        tokenParams: {
          value: ['clientId', 'redirect_uri', 'client_secret', 'code'],
        },
        tokenMethod: { value: 'POST' },
        userInfoEndpoint: {
          preferredControlType: 'textField',
          value: '',
        },
        state: {
          displayName: 'Send state with request',
          value: false,
          preferredControlType: 'toggleSwitch',
          info: 'Send unique state value with every request',
        },
        returnToUrl: {
          displayName: 'Application Return To URL',
          preferredControlType: 'textField',
          info: 'When using the embedded flow player widget and an IDP/Social Login connector, provide a callback URL to return back to the application.',
        },
        customAttributes: {
          displayName: 'Connector Attributes',
          preferredControlType: 'tableViewAttributes',
          info: 'These attributes will be available in User Connector Attribute Mapping.',
          sections: ['connectorAttributes'],
          value: [
            {
              name: 'sub',
              description: 'Sub',
              type: 'string',
              value: null,
              minLength: '1',
              maxLength: '300',
              required: true,
              attributeType: 'sk',
            },
          ],
        },
        userConnectorAttributeMapping: {
          preferredControlType: 'userConnectorAttributeMapping',
          newMappingAllowed: true,
          title1: null,
          title2: null,
          sections: ['attributeMapping'],
          value: {
            userPoolConnectionId: 'defaultUserPool',
            mapping: {
              username: {
                value1: 'sub',
              },
            },
          },
        },
        tokenAttributeMapping: {
          preferredControlType: 'mapping',
          newMappingAllowed: true,
          value: [
            {
              value1: 'accessToken',
              value2: 'data.access_token',
              deleteAllowed: false,
            },
            {
              value1: 'expiresIn',
              value2: 'data.expires_in',
              deleteAllowed: false,
            },
            {
              value1: 'idToken',
              value2: 'data.id_token',
              deleteAllowed: false,
            },
            {
              value1: 'refreshToken',
              value2: 'data.refresh_token',
              deleteAllowed: false,
            },
          ],
          title1: 'Token Properties',
          title2: 'UserPool Properties',
          placeholderAdd: 'Enter Attribute',
        },
      },
    },
    button: {
      displayName: 'OIDC Login',
      logo: '',
      showLogo: true,
      preferredControlType: 'button',
      css: {
        backgroundColor: '#75c88d',
        color: '#000000',
      },
      onClick: { location: '{{authorizationUrl}}' },
    },
    screenTemplateName: {},
  },
  capabilities: {
    loginFirstFactor: {
      type: 'trigger',
      title: 'Redirect to IdP',
      subTitle: 'OIDC redirect to IDP',
      disableCreateUser: true,
      localOutputSchema: {
        output: {
          type: 'object',
          properties: {
            sub: {
              type: 'string',
            },
            aud: {
              type: 'string',
            },
            jti: {
              type: 'string',
            },
            iss: {
              type: 'string',
            },
            iat: {
              type: 'number',
            },
            exp: {
              type: 'number',
            },
            auth_time: {
              type: 'string',
            },
            tokens: {
              type: 'object',
              properties: {
                access_token: {
                  type: 'string',
                },
                refresh_token: {
                  type: 'string',
                },
                id_token: {
                  type: 'string',
                },
                token_type: {
                  type: 'string',
                },
                expires_at: {
                  type: 'number',
                },
              },
            },
            connectionId: {
              type: 'string',
            },
            connectorId: {
              type: 'string',
            },
          },
        },
      },
      respondToUser: true,
      userViews: [
        {
          screenTemplateName: 'LoginScreen1',
          items: [
            {
              propertyName: 'button',
              fields: {},
            },
            { propertyName: 'showPoweredBy' },
            { propertyName: 'skipButtonPress' },
          ],
        },
      ],
      flowConfigView: {
        items: [
          {
            propertyName: 'button',
            fields: {},
          },
          {
            propertyName: 'showPoweredBy',
            fields: {},
          },
          { propertyName: 'skipButtonPress' },
        ],
      },
    },
  },
  accountConfigView: {
    componentViewSize: 'large',
    items: [
      {
        propertyName: 'openId',
        items: [
          {
            propertyName: 'providerName',
          },
          {
            propertyName: 'skRedirectUri',
          },
          {
            propertyName: 'issuerUrl',
          },
          {
            propertyName: 'authorizationEndpoint',
          },
          {
            propertyName: 'tokenEndpoint',
          },
          {
            propertyName: 'userInfoEndpoint',
          },
          {
            propertyName: 'clientId',
          },
          {
            propertyName: 'clientSecret',
          },
          {
            propertyName: 'scope',
          },
          {
            propertyName: 'state',
          },
          {
            propertyName: 'returnToUrl',
          },
        ],
      },
    ],
  },
};

module.exports = connectorOIDC;

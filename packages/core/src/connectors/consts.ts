import { getEnv } from '@silverhand/essentials';

export const connectorPackages = getEnv(
  'CONNECTOR_PACKAGES',
  [
    '@logto/connector-alipay',
    '@logto/connector-alipay-native',
    '@logto/connector-aliyun-dm',
    '@logto/connector-aliyun-sms',
    '@logto/connector-apple',
    '@logto/connector-facebook',
    '@logto/connector-github',
    '@logto/connector-google',
    '@logto/connector-sendgrid-email',
    '@logto/connector-smtp',
    '@logto/connector-twilio-sms',
    '@logto/connector-wechat',
    '@logto/connector-wechat-native',
  ].join(',')
).split(',');

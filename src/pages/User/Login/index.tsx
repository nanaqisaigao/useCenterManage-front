import {Footer} from '@/components';
import {login} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {FormattedMessage, Helmet, history, SelectLang, useIntl, useModel} from '@umijs/max';
import {Alert, FloatButton, message} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import {createStyles} from 'antd-style';
import {WEB_LOGO} from "@/constant/logo";
import LoginFooter from "@/components/LoginFooter";


const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});


const Lang = () => {
  const {styles} = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {

  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({...values, type});
      if (user) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        // debugger;
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/welcome');
        // history.push('//welcome');
        // debugger;
        return;
      }

      setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const {status, type: loginType} = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang/>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          // logo={<img alt="logo" src="https://picsum.photos/id/237/100/100" />}
          logo={WEB_LOGO}
          title="这是一个网站"
          subTitle={<>"一个简单的网站"</>}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >

          <h2 style={{textAlign: "center", color: "#00BBFF"}}>账号密码登录</h2>
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账号或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder='请输入账号'
                rules={[
                  {
                    required: true,
                    message: '账号是必填的哦'
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填的哦'
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8位'
                  }
                ]}
              />

            </>

          )}


          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/*<Flex gap="large" align="start">*/}
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
            </ProFormCheckbox>

              {/*<Button style={{background: "#CCEEFF"}}>*/}
              {/*<a href="/user/register" style={{fontSize:"16px"}}>新用户注册</a>*/}
              {/*</Button>*/}

              <a onClick={() => alert("请联系我")}
                 style={{
                   float: 'right',
                 }}
              >
                忘记密码？{/*<FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />*/}
              </a>


            {/*</Flex>*/}
          </div>
        </LoginForm>
      </div>
      <FloatButton   href = "/user/register" tooltip={<div>新用户注册</div>}/>
      <LoginFooter/>
    </div>
  );
};

export default Login;

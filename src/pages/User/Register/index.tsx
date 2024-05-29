import {Footer} from '@/components';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history, SelectLang, useIntl} from '@umijs/max';
import {FloatButton, message} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
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



const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {styles} = useStyles();
  const intl = useIntl();


  const handleSubmit = async (values: API.RegisterParams) => {
    const {userAccount, userPassword, checkPassword} = values;

    if (userPassword !== checkPassword) {
      message.error("两次输入的密码不一致");
      return;
    }
    try {
      // 注册
      // const id = await register({userAccount,userPassword,checkPassword});
      const id = await register(values);

      if (id > 0) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '注册成功！',
        });
        message.success(defaultLoginSuccessMessage);

        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/user/login');
        return;
      }else{
        throw new Error(`register error id = ${id}`);
      }

    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
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
            defaultMessage: '注册页',
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
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          // logo={<img alt="logo" src="https://picsum.photos/id/237/100/100" />}
          logo={WEB_LOGO}
          title="这是注册页面"
          subTitle={<>"一个简单的页面"</>}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >

          <h2 style={{textAlign: "center", color: "black"}}>账号密码注册</h2>

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
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder="请确认密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项'
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

          </div>
        </LoginForm>
      </div>

      <LoginFooter/>
      <FloatButton href = "/user/login" tooltip={<div>返回登录</div>}/>
    </div>
  );
};

export default Register;

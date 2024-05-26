import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={"piao的网站" + currentYear}
      links={[
        {
          key: 'yuquelocate',
          title: <>
            <svg d="1716706463495" className="icon" viewBox="0 0 1042 800" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2820" width="16" height="16">
              <path
                d="M513.956201 0C231.092396 0 1.956201 229.136194 1.956201 512S231.092396 1024 513.956201 1024c282.863806 0 512-229.136194 512-512S796.820007 0 513.956201 0zM841.021445 302.678244c-27.562391 12.701563-92.848425 53.219548-38.231704 144.41677C831.241242 494.471843 837.592023 713.573803 586.482125 713.573803c-20.068469 22.227735-161.055817 135.906723-399.591168 71.636815 71.76383-82.433143 149.243364-169.946911 222.27735-252.888117 114.060035-129.428926 228.247085-218.974944 112.154801-311.950385 79.892831-0.889109 231.676507-23.116844 266.224758 79.384768l53.473579 2.92136z m-75.574299 48.138923z"
                p-id="2821">
              </path>
            </svg>
            语雀个人知识库，点击跳转
          </>,
          href: 'https://www.yuque.com/u29061595',
          blankTarget: true,
        },
        {
          key: 'githublocate',
          title: <><GithubOutlined/>github开源项目，点击跳转</>,
          href: 'https://github.com/nanaqisaigao',
          blankTarget: true,
        },


      ]}
    />
  );
};

export default Footer;

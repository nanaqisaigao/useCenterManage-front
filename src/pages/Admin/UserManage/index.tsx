import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tooltip: '用户名过长会自动收缩',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    ellipsis: true,
    render: (_, record) => (//第一个参数一一列，第二个是一行
        <div>
          <Image src={record.avatarUrl} width={50}/>
        </div>

    )
  },
  {
    title: '性别',
    dataIndex: 'gender',
    copyable: true,
    ellipsis: true,
    valueType:'select',
    valueEnum:{
      0:{text:'男',status:'Default'},
      1:{text:'女',status:'Success'}
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    ellipsis: true,
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    ellipsis: true,
    valueType:'select',
    valueEnum:{
      0:{text:'普通用户',status:'Default'},
      1:{text:'管理员',status:'Success'}
    }
  },
  {
    title: '注册留言',
    dataIndex: 'comment',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    ellipsis: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const userList = await searchUsers();
        return {
          data:userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [


      ]}
    />
  );
};

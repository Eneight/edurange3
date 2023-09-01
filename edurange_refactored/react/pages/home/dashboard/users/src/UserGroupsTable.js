
import React, {useContext} from 'react';
import { MainFrameContext } from '../../../main_frame/MainFrame'

import '../main/NewDash.css'

function UserGroupsTable() {

  const { session_instructorData_state } = useContext(MainFrameContext);

    const tempData = session_instructorData_state.userGroups || [];  

    return (
        <div className="newdash-datatable-frame">
            <div className="newdash-datatable-header">
                <div>Group Code</div>
                <div>Group ID</div>
                <div>is_hidden</div>
                <div>Group Name</div>
                <div>Owner ID</div>
                <div>is_active</div>
                <div>scenarios_memberOf</div>
                <div>user_members</div>
            </div>
            {tempData.map((userGroup, index) => (
                <div key={index} className="table-row">
                    <div>{userGroup.code}</div>
                    <div>{userGroup.id}</div>
                    <div>{userGroup.is_hidden}</div>
                    <div>{userGroup.name}</div>
                    <div>{userGroup.ownerID}</div>
                    <div>{userGroup.is_active ? "true":"false"}</div>
                    <div>{userGroup.scenarios_memberOf}</div>
                    <div>{userGroup.user_members}</div>
                </div>
            ))}
        </div>
    );
}

export default UserGroupsTable;

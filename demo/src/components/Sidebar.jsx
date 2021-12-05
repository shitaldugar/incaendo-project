import React from "react";
import {FaInbox,FaRegCalendarAlt,FaRegCalendar} from "react-icons/fa";

const Sidebar =({selectedTab,setSelectedTab})=>{
    return (
        <div className="sidebar">
            <div 
            classname={selectedTab==="INBOX"?"active" :""}
            onclick={()=>setSelectedTab("INBOX")}
            >
                <FaInbox className="icon" />
                Inbox
                    </div>
            <div className={selectedTab==="TODAY" ?"active":""}
             onclick={()=>setSelectedTab("TODAY")}
             >
                <FaRegCalendarAlt className="icon"/>
                Today
                </div>
            <div className={selectedTab==="NEXT_7" ?"active":""}
              onclick={()=>setSelectedTab("NEXT_7")}
              >
            <FaRegCalendar className="icon"/>
             Next 7 days
             </div>
        </div>    
    );
};

export default Sidebar;
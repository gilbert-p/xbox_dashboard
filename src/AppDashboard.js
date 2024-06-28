import React, {useEffect, useState} from 'react';
import useFetchMockDatabase from './custom_hooks/useFetchMockDatabase';
import useDelayedFetchDatabase from './custom_hooks/useDelayedFetchDatabase';

import DeviceSetup from './DeviceSetup';



function AppDashboard() {
    

    const [mockDbData, setMockDbData] = useState(null);

    // const { data: serverData } = useDelayedFetchDatabase('https://xb-dashboard-server.netlify.app/api/dashboard_db', 0);
    const { data: mockResponse } = useFetchMockDatabase(1000);

    useEffect(() => {
        if (mockResponse) {
            console.log('setting data');
          setMockDbData(organizeByCategory(mockResponse));
        }
      }, [mockResponse]);

    function organizeByCategory(data) {
        return data.reduce((acc, item) => {
            const { category } = item;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});
      }


    return (
        <>
        {mockDbData ?  <DeviceSetup mockDbData={mockDbData}/>: <></>}
        </>
    );
}

export default AppDashboard;
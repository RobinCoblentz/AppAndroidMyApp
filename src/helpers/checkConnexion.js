export function CheckConnectivity()  {
    // For Android devices
    if (Platform.OS === "android")
    {
        NetInfo.isConnected.fetch()
        .then(isConnected => 
        {
            if (isConnected) 
            {
                return true ;
            } else 
            {
                return false;
            }
        })
    }
}
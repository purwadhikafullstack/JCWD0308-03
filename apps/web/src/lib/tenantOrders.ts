export default async function GetTenantOrders(tenantId: string) {
    console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}tenantManagements/${tenantId}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}tenantManagements/${tenantId}`);
    const data = await res.json();
    
    return data;
    // console.log(tenantId);
    
}
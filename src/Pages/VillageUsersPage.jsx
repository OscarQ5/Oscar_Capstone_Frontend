// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useLoginDataProvider } from '../Components/LoginProvider'

// const VillageUsersPage = () => {
//     const [villageUsers, setVillageUsers] = useState([])
//     const { village_id } = useParams()
//     const { API, token } = useLoginDataProvider()

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${API}/users/village-users/${village_id}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         'Authorization': token
//                     },
//                 });
                
//                 const data = await response.json()
//                 const usersWithInfo = await Promise.all(data.map(async (user) => {
//                     const userInfoResponse = await fetch(`${API}/users/${user.user_id}`, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             'Authorization': token
//                         },
//                     });
//                     const userInfo = await userInfoResponse.json();
//                     return { ...user, userInfo };
//                 }))
//                 setVillageUsers(usersWithInfo)
//             } catch (error) {
//                 console.error(error)
//             }
//         };

//         fetchData()
//     }, [village_id])

//     console.log(village_id)
//     console.log(villageUsers)
//     return (
//         <div>
//             <h2>Village Users</h2>
//             <ul>
//                 {villageUsers.map(user => (
//                     <li key={user.village_user_id}>
//                         Name: {user.userInfo.name} <br/>
//                         Phone Number: {user.userInfo.phone_number}<br/>
//                         {user.user_id} - {user.is_admin ? 'Admin' : 'Member'}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default VillageUsersPage
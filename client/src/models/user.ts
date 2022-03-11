export interface User {
    firstName: string;
    lastName: string;
    handle: string;
    password: string;
    email: string;
    picture: string;
    id: number;
    userTasks : any;
}

export const list: User[] = [
    {
        id: 1,
        handle: 'Yuvi',
        firstName: 'Bharath',
        lastName: 'Rongali',
        password: 'Yuvi',
        email: 'rongali@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/4.jpg',
        userTasks: [
            {task : 'Need to update vue',dueDate:'04/21/2022', isCompleted: true, assignedBy: "Kota"},
            {task : 'Need to update pinia',dueDate:'05/18/2022', isCompleted: false, assignedBy: "Yash"},
            {task : 'Need to update express',dueDate:'03/11/2022', isCompleted: true, assignedBy: "Kota"}
        ]
    },
    {
        id: 2,
        handle: 'Kota',
        firstName: 'Naveena',
        lastName: 'Kota',
        password: 'Kota',
        email: 'kota@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/5.jpg',
        userTasks: [
            {task : 'Need to update angular',dueDate:'03/21/2022', isCompleted: false, assignedBy: "Bharath"},
            {task : 'Need to update react',dueDate:'03/26/2022', isCompleted: false, assignedBy: "Yash"}
        ]
    },
    {
        id: 3,
        handle: 'Ghatge',
        firstName: 'Yash',
        lastName: 'Ghatge',
        password: 'Ghatge',
        email: 'ghatge@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/2.jpg',
        userTasks: [
            {task : 'Need to update jQuery',dueDate:'04/05/2022', isCompleted: false, assignedBy: "Kota"},
            {task : 'Need to update ajax',dueDate:'03/25/2022', isCompleted: false, assignedBy: "Bharath"}
        ]
    }
]
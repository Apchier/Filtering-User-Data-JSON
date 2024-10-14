import { NextResponse, NextRequest } from "next/server";
import users from "../../../../public/data/user.json"

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    let filteredUsers = [...users]; 

    const userName = searchParams.get("name");
    if (userName) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(userName.toLowerCase())
        );
    }

    const city = searchParams.get("city");
    if (city) {
        filteredUsers = filteredUsers.filter(user =>
            user.city.toLowerCase().includes(city.toLowerCase())
        );
    }

    const age = searchParams.get("age");
    if (age && Number(age)) {
        filteredUsers = filteredUsers.filter(user => user.age === Number(age));
    }

    const id = searchParams.get("id");
    if (id && Number(id)) {
        filteredUsers = filteredUsers.filter(user => user.id === Number(id));
    }

    if (filteredUsers.length === 0) {
        return NextResponse.json({
            message: 'No users found with the specified criteria.'
        }, { status: 404 });
    }

    return NextResponse.json({
        users: filteredUsers
    });
};

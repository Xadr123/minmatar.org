import type { Group, SigRequest } from '@dtypes/api.minmatar.org'

const API_ENDPOINT = `${import.meta.env.API_URL}/api/sigs`

export async function get_groups() {
    const headers = {
        'Content-Type': 'application/json',
    }

    console.log(`Requesting: ${API_ENDPOINT}/`)

    try {
        const response = await fetch(`${API_ENDPOINT}/`, {
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json() as Group[];
    } catch (error) {
        throw new Error(`Error fetching sigs: ${error.message}`);
    }
}

export async function get_current_groups(access_token:string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting: ${API_ENDPOINT}/current`)

    try {
        const response = await fetch(`${API_ENDPOINT}/current`, {
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json() as Group[];
    } catch (error) {
        throw new Error(`Error fetching current sigs: ${error.message}`);
    }
}

export async function get_group_by_id(id:number) {
    const headers = {
        'Content-Type': 'application/json',
    }

    console.log(`Requesting: ${API_ENDPOINT}/${id}`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as Group
    } catch (error) {
        throw new Error(`Error fetching sig by id: ${error.message}`)
    }
}

export async function get_group_requests(access_token:string, id:number) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting: ${API_ENDPOINT}/${id}/requests`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}/requests`, {
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as SigRequest[]
    } catch (error) {
        throw new Error(`Error fetching group requests: ${error.message}`)
    }
}

export async function create_group_request(access_token:string, id:number) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting POST: ${API_ENDPOINT}/${id}/requests`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}/requests`, {
            method: 'POST',
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as SigRequest
    } catch (error) {
        throw new Error(`Error creating sig request: ${error.message}`)
    }
}

export async function approve_group_request(access_token:string, id:number, request_id: number) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting: ${API_ENDPOINT}/${id}/requests/${request_id}/approve`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}/requests/${request_id}/approve`, {
            method: 'POST',
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as SigRequest
    } catch (error) {
        throw new Error(`Error approving sig request: ${error.message}`)
    }
}

export async function deny_group_request(access_token:string, id:number, request_id: number) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting: ${API_ENDPOINT}/${id}/requests/${request_id}/deny`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}/requests/${request_id}/deny`, {
            method: 'POST',
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as SigRequest
    } catch (error) {
        throw new Error(`Error denying sig request: ${error.message}`)
    }
}

export async function remove_group_member(access_token:string, id:number, user_id:number) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    console.log(`Requesting DELETE: ${API_ENDPOINT}/${id}/members/${user_id}`)

    try {
        const response = await fetch(`${API_ENDPOINT}/${id}/members/${user_id}`, {
            method: 'DELETE',
            headers: headers
        })

        // console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json() as Group
    } catch (error) {
        throw new Error(`Error removing sig member: ${error.message}`)
    }
}
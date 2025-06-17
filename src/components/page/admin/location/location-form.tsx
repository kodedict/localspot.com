"use client"

import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"

const LocationForm = () => {
    return (
        <form className="grid gap-4 mt-10">
            <div className="grid gap-2 md:grid-cols-2">
                <InputField label="Name" />
                <InputField label="Post code" />
            </div>
            <Button text="Submit"/>
        </form>
    )
}

export default LocationForm
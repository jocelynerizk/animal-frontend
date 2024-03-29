function DeleteRequirement({ fetchRequirements, closeDeleteRequirementModal, deleteRequirement, requirementID }) {
    const handleDelete = () => {
        console.log('Category ID prop to delete: ', requirementID);
        closeDeleteRequirementModal();
        deleteRequirement(requirementID);
        fetchRequirements();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                    Are you sure you want to delete this Requirement?
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block  mr-4"
                        onClick={closeDeleteRequirementModal}>
                        CANCEL
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-700 text-white font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block"
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteRequirement;
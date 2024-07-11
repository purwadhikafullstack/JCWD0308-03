import CreateRoomForm from "../../_components/CreateRoomForm"

const CreateRoom = ({params}: {params: {id: number}}) => {
  return (
    <div className="flex justify-center items-center pt-10">
      <CreateRoomForm id={params.id}/>
    </div>
  )
}

export default CreateRoom
/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react'
import Modal from './Components/Modal'

function App() {
  const [photo, setPhoto] = useState('')
  const [aboutMe, setAboutMe] = useState([])
  const [role, setRole] = useState('')
  const [projects, setProjects] = useState([])
  const [techSkills, setTechSkills] = useState([])
  const [tools, setTools] = useState([])
  const [softSkills, setSoftSkills] = useState([])
  const [education, setEducation] = useState([])
  const [jsonData, setJsonData] = useState([])
  const [addProject, setAddProject] = useState({})
  const [password,setPassword] = useState("")
 
  console.log(jsonData)
  useEffect(() => {
    (async () => {
      // const response_Photo = await fetch("https://my-portfolio-server-eosin.vercel.app/api/v1/photo")
      const response_Photo = await fetch('http://localhost:3000/api/v1/photo')

      // const response_data = await fetch("https://my-portfolio-server-eosin.vercel.app/api/v1/about_me")
      const response_data = await fetch('http://localhost:3000/api/v1/data')
      const data = await response_data.json()
      
      setRole(data.role)
      setAboutMe(data.about_me)
      setProjects(data.projects)
      setPhoto(response_Photo.url)
      setTechSkills(data.skills[0].technical_skills)
      setTools(data.skills[0].tools)
      setSoftSkills(data.skills[0].soft_skills)
      setEducation(data.education)
      setJsonData(data)
      
    })()
  }, [])
  
  function handleAboutMe(e) {
    const updateAboutMe = (jsonData.about_me = e.target.value)
    setAboutMe(updateAboutMe)
  }

  
  function handleRole(e) {
    const updateRole = (jsonData.role = e.target.value)
    setRole(updateRole)
  }


  async function handleDisplayPhoto(e) {
    
 
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('password',password)
      formData.append('api_route',"change display photo")
      const response = await fetch('http://localhost:3000/api/proxy', {
        method: 'POST',
        body: formData,
        headers:{
          "X-API-KEY":password
        }
      })
      console.log(file)
      const data = await response.json()

      //Check if X-API-KEY is correct
      if(data.message){
        alert(data.message)
      }else{
        alert(data.error)
      }
  }


  async function handleProjectImage(e, image_name, index) {

    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('imageToReplace', image_name)
    formData.append('password',password)
    formData.append('api_route',"change project image")
    formData.append('index', index)
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'POST',
      body: formData,
      headers:{
        "X-API-KEY":password
      }
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
    
  }


  async function handleSave() {
    const obj = {
      ...jsonData,
      password:password,
      api_route:"save inputs"
    }
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY':obj.password
      },
      body: JSON.stringify(obj),
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
    console.log(obj)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTechSkillModalOpen, setIsTechSkillModalOpen] = useState(false)
  const [isSoftSkillModalOpen, setIsSoftSkillModalOpen] = useState(false)
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const techSkillModal = () => setIsTechSkillModalOpen(!isTechSkillModalOpen)
  const softSkillModal = () => setIsSoftSkillModalOpen(!isSoftSkillModalOpen)
  const toolsModal = () => setIsToolsModalOpen(!isToolsModalOpen)


  function handlePasswordInput(e){
    setPassword(e.target.value)
  }

  async function handleDeleteProject(index, imageName) {
    const obj = {
      index: index,
      image: imageName,
      api_route: "delete project"
    }
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': password
      },
      body: JSON.stringify(obj),
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
  }


  async function handleDeleteTechSkill(index) {
    const obj = 
    { 
      index: index, 
      api_route: "delete tech skill"
    }
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY':password
      },
      body: JSON.stringify(obj),
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
  }


  async function handleDeleteSoftSkill(index) {
    const obj = 
    {
       index: index,
       api_route:"delete soft skill" 
    }
    const response = await fetch('http://localhost:3000/api/proxy', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY':password
      },
      body: JSON.stringify(obj),
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
  }


  async function handleDeleteTool(index){
    const obj = 
    { 
      index: index,
      api_route: "delete tool"
    }
    const response = await fetch('http://localhost:3000/api/proxy',
    {
      method:"delete",
      headers:{
        "Content-Type":"application/json",
        "X-API-KEY":password
      },
      body: JSON.stringify(obj)
    })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
  }

  async function handleAddProjectSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const response = await fetch('http://localhost:3000/api/proxy',
    {
      method:'post',
      body:formData,
      headers:{
        "X-API-KEY":password
      }
    })
    const data = await response.json()
    console.log("data from addproject",data)


    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
    
  }
  async function handleAddTechSkillsSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const response = await fetch('http://localhost:3000/api/proxy',
  {
    method:"post",
    headers:{
      "X-API-KEY": password,
    },
    body:formData
  })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }
  }
  async function handleSoftSkillSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const response = await fetch("http://localhost:3000/api/proxy",
  {
    method:"post",
    body: formData,
    headers:{
      "X-API-KEY":password
    }
  })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }

  }
  async function handleToolSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const response = await fetch("http://localhost:3000/api/proxy",
  {
    method:"post",
    body: formData,
    headers:{
      "X-API-KEY":password
    }
  })
    const data = await response.json()
    if(data.message){
      alert(data.message)
    }else{
      alert(data.error)
    }

  }
  return (
    <>
      <div className="about_me_section">
        <img
          className="display_photo"
          height="20%"
          src={photo}
          alt="display_photo"
        />
        
        <input id = "password" type="password" onChange = {handlePasswordInput} placeholder='Enter Password'/>
        <input id = "file" type="file" onChange={handleDisplayPhoto} />

        <form className="about_me_form">
          <label htmlFor="role">Role: </label>
          <input
            style={{ width: '10%', padding: '5px' }}
            type="text"
            id="role"
            value={role}
            onChange={handleRole}
          />
          <label htmlFor="about_me">About Me</label>
          <textarea
            id="about_me"
            value={aboutMe}
            onChange={handleAboutMe}
          ></textarea>
        </form>
      </div>
      <div className="project_section">
        <h1>
          Projects
          {/* <Link to="/addProject">add project</Link> */}
          <button onClick={toggleModal}>+</button>
          <Modal isOpen={isModalOpen} close={toggleModal}>
            <div className="addProject">
              <form
                onSubmit = {handleAddProjectSubmit}
                encType="multipart/form-data"
              >
                <label htmlFor="image">Upload Image</label>
                <input
                  id="image"
                  type="file"
                  name="file"
                  // onChange={handleAddProjectChange}
                />
                <label htmlFor="project_name">Project Name </label>
                <input
                  id="project_name"
                  type="text"
                  name="project_name"
                  // onChange={handleAddProjectChange}
                />
                <label style={{ display: 'block' }} htmlFor="description">
                  Description
                </label>
                <textarea
                  style={{ display: 'block' }}
                  id="description"
                  name="description"
                  cols="100"
                  rows="10"
                  // onChange={handleAddProjectChange}
                />
                <label style={{ display: 'block' }} htmlFor="tech_used">
                  Tech Used
                </label>
                <textarea
                  style={{ display: 'block' }}
                  id="tech_used"
                  name="tech_used"
                  cols="30"
                  rows="10"
                  placeholder='put "," for newline'
                  // onChange={handleAddProjectChange}
                ></textarea>
                <label htmlFor="github_url">github_url</label>
                <input
                  id="github_url"
                  name="github_url"
                  type="text"
                  // onChange={handleAddProjectChange}
                />
                <input type="hidden" name = "api_route" value = "add project" />
                <input type="submit" />
              </form>
            </div>
          </Modal>
        </h1>

        {projects.map((data, index) => {
          function handleChange(e, projectDetail, techIndex = null) {
            const updateProjectInfo = [...projects]
            switch (projectDetail) {
              case 'projectName':
                updateProjectInfo[index].project_name = e.target.value
                break
              case 'projectDescription':
                updateProjectInfo[index].description = e.target.value
                break
              case 'projectTechUsed':
                let techUsedUpdate = [...updateProjectInfo[index].tech_used]
                techUsedUpdate[techIndex] = e.target.value
                updateProjectInfo[index].tech_used = techUsedUpdate
                break
              case 'githubUrl':
                updateProjectInfo[index].github_url = e.target.value
                break
            }
            setProjects(updateProjectInfo)
          }
          return (
            <>
              <div key={index} className="project_container">
                <button
                  style={{
                    right: '5%',
                    position: 'absolute',
                    marginTop: '.5%',
                  }}
                  onClick={() => {
                    handleDeleteProject(index, data.image)
                  }}
                >
                  x
                </button>
                <img
                  className="project_image"
                  src={`http://localhost:3000/images/${data.image}`}
                  alt="project_image"
                />
                {/* alter project image */}
                <input
                  type="file"
                  style={{ width: '20%', marginInline: 'auto' }}
                  onChange={(e) => handleProjectImage(e, data.image, index)}
                />

                <label htmlFor="project_name">Project Name</label>
                <input
                  style={{
                    width: '30%',
                    marginInline: 'auto',
                    textAlign: 'center',
                  }}
                  type="text"
                  value={data.project_name}
                  onChange={(e) => handleChange(e, 'projectName')}
                />
                <label htmlFor="project_description">Description</label>
                <textarea
                  style={{ width: '70%', marginInline: 'auto' }}
                  id="description"
                  value={data.description}
                  onChange={(e) => handleChange(e, 'projectDescription')}
                ></textarea>
                <label htmlFor="techUsed">Tech Used</label>

                {data.tech_used.map((tech, techIndex) => {
                  return (
                    <>
                      <input
                        style={{ width: '200px', marginInline: 'auto' }}
                        key={techIndex}
                        id="techUsed"
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          handleChange(e, 'projectTechUsed', techIndex)
                        }
                      />
                    </>
                  )
                })}

                <label htmlFor="githubUrl">Github Url:</label>
                <input
                  style={{ width: '20%', marginInline: 'auto' }}
                  id="githubUrl"
                  type="text"
                  value={data.github_url}
                  onChange={(e) => handleChange(e, 'githubUrl')}
                />
              </div>
            </>
          )
        })}
      </div>
      <div className="skills_section">
        <h1>Skills</h1>
        <h2>
          Technical Skills
          <button onClick={techSkillModal}>+</button>
          <Modal isOpen={isTechSkillModalOpen} close={techSkillModal}>
            <form onSubmit={handleAddTechSkillsSubmit}>
              <label htmlFor="proficiency">Proficiency: </label>
              <input type="text" id="proficiency" name="proficiency" />
              <label htmlFor="skill">Skill: </label>
              <input type="text" id="skill" name="skill" />
              <label htmlFor="description">Description: </label>
              <input type="text" id="description" name="description" />
              <input type="hidden" name = "api_route" value = "add tech skill" />
              <input type="submit" />
            </form>
          </Modal>
        </h2>
        {techSkills.map((data, index) => {
          function handleChange(e, type) {
            const updateTechSkill = [...techSkills]
            switch (type) {
              case 'proficiency':
                updateTechSkill[index].proficiency = e.target.value
                break
              case 'skill':
                updateTechSkill[index].skill = e.target.value
                break
              case 'description':
                updateTechSkill[index].description = e.target.value
                break
            }
            setTechSkills(updateTechSkill)
          }
          return (
            <div key={index} className="skills_container">
              <button
                style={{ float: 'right' }}
                onClick={() => handleDeleteTechSkill(index)}
              >
                x
              </button>
              <label htmlFor="proficiency">Proficiency: </label>
              <input
                id="proficiency"
                type="text"
                value={data.proficiency}
                onChange={(e) => handleChange(e, 'proficiency')}
              />
              <label htmlFor="skill">Skill: </label>
              <input
                id="skill"
                type="text"
                value={data.skill}
                onChange={(e) => handleChange(e, 'skill')}
              />
              <label style={{ display: 'block' }} htmlFor="description">
                Description:{' '}
              </label>
              <textarea
                style={{ width: '500px' }}
                id="description"
                type="text"
                value={data.description}
                onChange={(e) => handleChange(e, 'description')}
              />
            </div>
          )
        })}
        <h2>
          Soft Skills <button onClick={softSkillModal}>+</button>
        </h2>
        <Modal isOpen={isSoftSkillModalOpen} close={softSkillModal}>
          <form onSubmit={handleSoftSkillSubmit}>
            <label htmlFor="softSkill">Soft Skill: </label>
            <input
              type="text"
              id="softSkill"
              name="soft_skills"
              placeholder='write "," to add new line'
            />
            <input type="hidden" name = "api_route" value = "add soft skill" />
            <input type="submit" />
          </form>
        </Modal>
        {softSkills.map((data, index) => {
          function handleChange(e) {
            const updateSoftSkills = [...softSkills]
            updateSoftSkills[index] = e.target.value
            jsonData.skills[0].soft_skills[index] = e.target.value
            setSoftSkills(updateSoftSkills)
            console.log("softskill",softSkills)
           
          }
          return (
            <div key={index} className="softSkill_container">
              <button onClick={() => handleDeleteSoftSkill(index)}>x</button>
              <input
                id="softSkill"
                style={{ width: '300px' }}
                type="text"
                value={data}
                onChange={handleChange}
              />
            </div>
          )
        })}
        <h2>
          Tools
          <button onClick={toolsModal}>+</button>
          <Modal isOpen={isToolsModalOpen} close={toolsModal}>
            <form onSubmit = {handleToolSubmit}>
              <label htmlFor="tool">Tool: </label>
              <input type="text" id = "tool" name = "tool" />
              <label htmlFor="description">Description: </label>
              <input type="text" id = "description" name = "description" />
              <input type="hidden" name = "api_route" value = "add tool" />
              <input type="submit" />
            </form>
          </Modal>
        </h2>

        <table>
          <thead>
            <th></th>
            <th>Tool</th>
            <th>Descripton</th>
          </thead>
          <tbody>
            {tools.map((data, index) => {
              function handleChange(e) {
                const updateTools = [...tools]
                const { id, value } = e.target
                updateTools[index][id] = value
                setTools(updateTools)
              }
              return (
                <tr key={index}>
                  <button onClick={()=>{handleDeleteTool(index)}}>x</button>

                  <td>
                    <input
                      style={{ display: 'block', textAlign: 'center' }}
                      id="tool"
                      type="text"
                      value={data.tool}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <textarea
                      id="description"
                      type="text"
                      value={data.description}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="education_section">
        <h1>
          Education <button>+</button>
        </h1>
        {education.map((data, index) => {
          function handleChange(e) {
            const updateEducation = [...education]
            const { id, value } = e.target
            updateEducation[index][id] = value
            setEducation(updateEducation)
          }
          return (
            <div key={index} className="education_container">
              <img
                height="100vh"
                style={{ display: 'block', marginInline: 'auto' }}
                src={`http://localhost:3000/images/${data.school_image}`}
                alt="school_image"
              />
              <button style={{ width: '10%', marginInline: 'auto' }}>
                edit image
              </button>
              <label htmlFor="school_year">School year: </label>
              <input
                type="text"
                id="school_year"
                value={data.school_year}
                onChange={handleChange}
              />
              <label htmlFor="qualification">Qualification: </label>
              <input
                type="text"
                id="qualification"
                value={data.qualification}
                onChange={handleChange}
              />
              <label htmlFor="description">Description: </label>
              <textarea
                type="text"
                id="description"
                value={data.description}
                onChange={handleChange}
              />
            </div>
          )
        })}
      </div>
      <div className = "saveButton">
        
        <button onClick={handleSave}>Save the Inputs</button>
      </div>
      
    </>
  )
}

export default App

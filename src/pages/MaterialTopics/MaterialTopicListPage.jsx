import { Button, Spinner } from '@chakra-ui/react';
import React, { useContext } from 'react';
import MaterialTopicCard from '../../components/materialTopic-components/MaterialTopicCard';
import { useMaterialTopics } from '../../contexts/MaterialTopicContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export default function MaterialTopicListPage() { 

  const { user } = useContext(AuthContext);

  const { loading, allMaterialTopics } = useMaterialTopics();

  return (
    <>
      <div className='flex justify-center md:justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-[900]'>Materiales de temática ({allMaterialTopics.length})</h1>
        {user.role.name_role === 'admin' ? <Link to={`/admin/adminDashboard/materialTopic`}> 
          <Button colorScheme='twitter'>
            Crear material
          </Button>
        </Link> : ""}
        
      </div>

      {/* Material Topics List */}
      <div className='flex justify-center items-center gap-5 flex-wrap'>
        {
          loading ? <div className='flex justify-center my-10 items-center gap-3'>
            <Spinner />
            <small>Cargando</small> 
          </div> :
            allMaterialTopics?.length === 0 && !loading ? <p>No hay materiales por temática</p> : 
              allMaterialTopics?.map((materialTopic, idx) => ( 
                <MaterialTopicCard
                  key={idx}
                  materialTopic={materialTopic} 
                />
              ))
        }
      </div>  
    </>
  );
}

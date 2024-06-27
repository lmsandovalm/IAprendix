import { Button, Spinner } from '@chakra-ui/react';
import React, { useContext } from 'react';
import TestCard from '../../components/test-components/TestCard';
import { useTests } from '../../contexts/TestContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export default function TestListPage() {

  const { user } = useContext(AuthContext);

  const { loading, allTests } = useTests();

  return (
    <>
      <div className='flex justify-center md:justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-[900]'>Todos los tests ({allTests.length})</h1>
        {user.role.name_role === 'admin' ? <Link to={`/admin/adminDashboard/test`}>
          <Button colorScheme='twitter'>
            Crear Test
          </Button>
        </Link> : ""}
      </div>

      {/* Tests List */}
      <div className='flex justify-center items-center gap-5 flex-wrap'>
        {
          loading ? <div className='flex justify-center my-10 items-center gap-3'>
            <Spinner />
            <small>Loading tests</small>
          </div> :
            allTests?.length === 0 && !loading ? <p>No tests exist</p> :
              allTests?.map((test, idx) => (
                <TestCard
                  key={idx}
                  test={test}
                />
              ))
        }
      </div>  
    </>
  );
}

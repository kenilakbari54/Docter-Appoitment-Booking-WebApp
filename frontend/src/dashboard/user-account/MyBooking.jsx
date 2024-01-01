import React from 'react';
import UserFetchData from '../../hooks/userFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../component/Loader/Loading';
import Error from '../../component/Error/Error';
import DoctorCard from '../../component/Doctors/DoctorCard';

function MyBooking() {
  const {
    data: appointments,
    loading,
    error,
  } = UserFetchData(`${BASE_URL}/user/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book
        </h2>
      )}
    </div>
  );
}
export default MyBooking;

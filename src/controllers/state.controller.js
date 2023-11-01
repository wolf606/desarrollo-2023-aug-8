const State = require('../models/state.model');
const City = require('../models/city.model');
const { stateResource } = require('../resources/state.resource');
const User = require('../models/user.model');
const { getAuthenticatedUser } = require('../middleware/user.auth');

const index = async (req, res) => {
    State.find()
    .then((states) => {
        res.status(200).send(stateResource(states));
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find states. Reason: ", err});
        console.debug(err);
    });
}

const show = async (req, res) => {
    const params = req.params;
    State.findById({ _id: params.id })
    .then((state) => {
        if (state === null) {
            res.status(404).send({ error: "State not found." });
        } else {
            res.status(200).send(stateResource(state));
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. ", err});
        console.debug(err);
    });
}

const update = async (req, res) => {
    getAuthenticatedUser(req.headers.authorization)
    .then(async (user) => {
        if (user.role === User.Roles.admin) {
            try {
                const response = await fetch(
                    'https://www.datos.gov.co/resource/xdk5-pm3f.json'
                  );

                const data = await response.json();
                
                const uniqueDepartments = [];
                const uniqueMunicipalities = [];

                data.forEach((item) => {
                    const department = {
                        name: item.departamento,
                        code: item.c_digo_dane_del_departamento,
                    };

                    if (
                        !uniqueDepartments.find((d) => d.code === department.code)
                    ) {
                        uniqueDepartments.push(department);
                    }

                    const municipality = {
                        name: item.municipio,
                        code: item.c_digo_dane_del_municipio,
                        stateCode: item.c_digo_dane_del_departamento,
                    };

                    if (
                        !uniqueMunicipalities.find(
                        (m) =>
                            m.code === municipality.code &&
                            m.departmentCode === municipality.departmentCode
                        )
                    ) {
                        uniqueMunicipalities.push(municipality);
                    }
                }); 
            
                await State.deleteMany();
                await City.deleteMany();
            
                await State.insertMany(uniqueDepartments);
                await City.insertMany(uniqueMunicipalities);

                console.log('Datos actualizados correctamente');
                res.status(201).send({ message: 'Datos actualizados correctamente' });
              } catch (error) {
                console.error('Error al actualizar los datos:', error);
                res.status(500).send({ error: 'Error al actualizar los datos' });
              }
        } else {
            res.status(403).send({ error: "You are not authorized to create a state." });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "});
        console.debug(err);
    });
};

module.exports = { index, show, update };
import { faker } from '@faker-js/faker';

function createFakeRow(index: number) {
  return {
    id: index,
    avatar: faker.image.avatar(),
    county: faker.location.county(),
    email: faker.internet.email(),
    title: faker.person.prefix(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.street(),
    zipCode: faker.location.zipCode(),
    date: faker.date.past().toLocaleDateString(),
    jobTitle: faker.person.jobTitle(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.name(),
    jobArea: faker.person.jobArea(),
    jobType: faker.person.jobType(),
    phone: faker.phone.number()
  };
}

export default function createRowData(count: number) {
  return [...Array(count).keys()].map((i) => createFakeRow(i));
}

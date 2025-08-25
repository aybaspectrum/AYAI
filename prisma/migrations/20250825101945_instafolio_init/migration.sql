-- CreateTable
CREATE TABLE "public"."InstaFolioTestData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "phone" TEXT,
    "calendly" TEXT,
    "section2Label" TEXT NOT NULL,
    "section2Vars" TEXT[],
    "section2Vals" INTEGER[],
    "footerTagline" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstaFolioTestData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Education" (
    "id" TEXT NOT NULL,
    "testDataId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "testDataId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" TEXT NOT NULL,
    "testDataId" TEXT NOT NULL,
    "dateRange" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "achievements" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "testDataId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_testDataId_fkey" FOREIGN KEY ("testDataId") REFERENCES "public"."InstaFolioTestData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_testDataId_fkey" FOREIGN KEY ("testDataId") REFERENCES "public"."InstaFolioTestData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_testDataId_fkey" FOREIGN KEY ("testDataId") REFERENCES "public"."InstaFolioTestData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_testDataId_fkey" FOREIGN KEY ("testDataId") REFERENCES "public"."InstaFolioTestData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

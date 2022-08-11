CREATE TABLE [dbo].[Model] (
    [Id]   UNIQUEIDENTIFIER NOT NULL,
    [Name] VARCHAR (100)    NOT NULL,
    [IsDeleted] BIT NOT NULL Default(0),
    PRIMARY KEY (Id),
    UNIQUE(Name)
);


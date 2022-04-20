USE [Kanoq.Database]  
GO  
Create User KanoqApiUser for Login KanoqApiUser with Default_schema = dbo;
GO
EXEC sp_addrolemember N'db_datareader', N'KanoqApiUser'  
GO 
EXEC sp_addrolemember N'db_datawriter', N'KanoqApiUser'  
GO 
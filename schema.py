from sqliteframe import Database, Table, String, Integer, Blob, ForeignKey, FKRestraints


database = Database("database.db", output=True)


@Table(database)
class __EFMigrationsHistory:
	MigrationId = String(primary_key=True)
	ProductVersion = String


@Table(database)
class CarClasses:
	Id = Integer(primary_key=True)
	UniqueName = String(nullable=True)
	Name = String(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Championships:
	Id = Integer(primary_key=True)
	UniqueName = String(nullable=True)
	Name = String(nullable=True)
	BaseChampionshipString = String(nullable=True)
	GamesRaw = Blob(nullable=True)
	CarsRaw = Blob(nullable=True)
	TeamsRaw = Blob(nullable=True)
	TracksRaw = Blob(nullable=True)
	DefaultCarId = Integer(nullable=True)
	DefaultCarStringId = String(nullable=True)
	RacesCount = Integer
	QualsCount = Integer
	PracticesCount = Integer
	RaceType1 = Integer
	RaceType2 = Integer
	RaceType3 = Integer
	QualType1 = Integer
	QualType2 = Integer
	QualType3 = Integer
	GridSize = Integer
	SeatsPerTeam = Integer
	SeatsReserve = Integer
	FastestLapPointsPositionEdge = Integer
	IgnoreWorstEventsEachDriver = Integer
	LineupsBasedType = Integer
	IsMinorRacesEqualsMajor = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Games:
	Id = Integer(primary_key=True)
	UniqueName = String(nullable=True)
	Name = String(nullable=True)
	Developer = String(nullable=True)
	Publisher = String(nullable=True)
	ReleaseDate = String
	PlatformsRaw = String(nullable=True)
	BuyLink = String(nullable=True)
	OfficialLink = String(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Images:
	Id = Integer(primary_key=True)
	PngRaw = Blob(nullable=True)
	Length = Integer
	Name = String(nullable=True)
	NameUnique = String(nullable=True)
	Type = String(nullable=True)
	Hash = String(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class LeagueCategories:
	Id = Integer(primary_key=True)
	Name = String(nullable=True)
	ShortName = String(nullable=True)
	Priority = Integer
	ColorRaw = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class LeagueSettings:
	Id = Integer(primary_key=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
	Name = String(nullable=True)
	Type = String(nullable=True)
	Value = String(nullable=True)


@Table(database)
class Nationalities:
	Id = Integer(primary_key=True)
	Name = String
	Code = String(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Users:
	Id = Integer(primary_key=True)
	Name = String(nullable=True)
	Guid = String(nullable=True)
	Password = String(nullable=True)
	UserRole = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class PointActions:
	Id = Integer(primary_key=True)
	ActionType = Integer
	DriverPointsRaw = Integer
	TeamPointsRaw = Integer
	ChampionshipId = ForeignKey(Championships, nullable=True, on_update=FKRestraints.NO_ACTION)
	SessionType = Integer
	SessionPosition = Integer(nullable=True)
	RaceType = Integer(nullable=True)
	QualificationType = Integer(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Seasons:
	Id = Integer(primary_key=True)
	Name = String(nullable=True)
	FullName = String(nullable=True)
	ChampionshipId = ForeignKey(Championships, nullable=True, on_update=FKRestraints.NO_ACTION)
	LeagueCategoryId = ForeignKey(LeagueCategories, nullable=True, on_update=FKRestraints.NO_ACTION)
	TimeOffsetType = Integer
	Priority = Integer
	IsArchive = Integer
	QualsCount = Integer
	RacesCount = Integer
	PracticesCount = Integer
	RaceType1 = Integer
	RaceType2 = Integer
	RaceType3 = Integer
	QualType1 = Integer
	QualType2 = Integer
	QualType3 = Integer
	GridSize = Integer
	SeatsPerTeam = Integer
	SeatsReserve = Integer
	IsSeparateReservesAtStandings = Integer
	IsStandingsShowAllLineups = Integer
	IsStandingsShowReserves = Integer
	IsStandingsShowArchiveDrivers = Integer
	IsShowTimesInsteadGapInQual = Integer
	LimitNumberDriversOnStandings = Integer
	IgnoreWorstEventsEachDriver = Integer
	IgnoreWorstEventsEachTeam = Integer
	StartIgnoreWorstEventsAfterPercent = Integer
	IsReserveBringTeamPoints = Integer
	IsExcludeReservesFromClassification = Integer
	ReserveProcessingMode = Integer
	LineupsBasedType = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
	IsDnfDriversCanBeClassified = Integer(default=0)


@Table(database)
class Drivers:
	Id = Integer(primary_key=True)
	Name = String
	RealName = String(nullable=True)
	InGameName = String(nullable=True)
	DiscordName = String(nullable=True)
	DiscordLink = String(nullable=True)
	SteamName = String(nullable=True)
	SteamLink = String(nullable=True)
	BadgeName = String(nullable=True)
	BadgeIcons = String(nullable=True)
	NationId = ForeignKey(Nationalities, nullable=True, on_update=FKRestraints.NO_ACTION)
	LeagueRole = Integer
	RaceNumber = Integer(nullable=True)
	NationIngameId = Integer(nullable=True)
	LeagueCategoriesRaw = Blob(nullable=True)
	IsArchive = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
	Description = String(nullable=True)
	GamePlatform = Integer(default=0)


@Table(database)
class Tracks:
	Id = Integer(primary_key=True)
	UniqueName = String
	CircuitName = String(nullable=True)
	CircuitFullName = String(nullable=True)
	LocationName = String(nullable=True)
	Years = String(nullable=True)
	TrackLayout = Integer
	TrackType = Integer
	NationId = ForeignKey(Nationalities, on_update=FKRestraints.NO_ACTION)
	Length = Integer
	NumberTurns = Integer
	RaceLapRecordTimeInt = Integer
	RaceLapRecordDriverName = String(nullable=True)
	RaceLapRecordYear = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Vendors:
	Id = Integer(primary_key=True)
	UniqueName = String(nullable=True)
	Name = String(nullable=True)
	NationId = ForeignKey(Nationalities, on_update=FKRestraints.NO_ACTION)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class SessionResults:
	Id = Integer(primary_key=True)
	EventId = Integer(nullable=True)
	TrackId = Integer(nullable=True)
	SessionType = Integer
	RaceType = Integer
	QualType = Integer
	SessionPosition = Integer
	Date = String
	SessionStatus = Integer
	CompletedStatus = Integer
	IsSkip = Integer
	FastestLapDriverId = ForeignKey(Drivers, nullable=True, on_update=FKRestraints.NO_ACTION)
	FastestLapDriverName = String(nullable=True)
	FastestLapTimeInt = Integer
	FastestLapNumLap = Integer
	FastestLapValidFlags = Integer
	DriverDayDriverId = ForeignKey(Drivers, nullable=True, on_update=FKRestraints.NO_ACTION)
	DriverDayDriverName = String(nullable=True)
	BestMomentDriverId = ForeignKey(Drivers, nullable=True, on_update=FKRestraints.NO_ACTION)
	BestMomentDriverName = String(nullable=True)
	LiveId = Integer
	LiveStartDate = String
	LiveEndDate = String
	IsLiveSource = Integer
	IsLiveData = Integer
	LiveUserName = String(nullable=True)
	MovedTargetSessionId = Integer(nullable=True)
	IsSingleplayerMode = Integer
	ChampionshipType = Integer
	GameType = Integer
	WeatherType = Integer
	AirTemperature = Integer
	TrackTemperature = Integer
	TotalLaps = Integer
	SessionDuration = String
	SessionDetailsRaw = Blob(nullable=True)
	QualificationType = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
	IsLiveFullRecord = Integer(default=0)
	LiveRecordPercent = Integer(default=0)


@Table(database)
class Events:
	Id = Integer(primary_key=True)
	Name = String(nullable=True)
	FullName = String(nullable=True)
	ShortName = String(nullable=True)
	TrackId = ForeignKey(Tracks, on_update=FKRestraints.NO_ACTION)
	Date = String
	CompletedStatus = Integer
	EventStatus = Integer
	SeasonId = Integer
	Description = String(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database)
class Cars:
	Id = Integer(primary_key=True)
	UniqueName = String(nullable=True)
	Name = String(nullable=True)
	CarClassId = ForeignKey(CarClasses, on_update=FKRestraints.NO_ACTION)
	VendorId = ForeignKey(Vendors, nullable=True, on_update=FKRestraints.NO_ACTION)
	Year = Integer
	Power = Integer
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


@Table(database, auto_create=False)
class Teams:
	Id = Integer(primary_key=True)
	Name = String
	FullName = String(nullable=True)
	UniqueName = String(nullable=True)
	Abbreviation = String(nullable=True)
	CarId = ForeignKey(Cars, nullable=True, on_update=FKRestraints.NO_ACTION)
	NationId = ForeignKey(Nationalities, nullable=True, on_update=FKRestraints.NO_ACTION)
	Position = Integer(nullable=True)
	ColorRaw = Integer
	Badge = String(nullable=True)
	Prestige = Integer
	Year = Integer
	Seats = Integer
	PrevTeamId = ForeignKey(lambda: Teams, nullable=True, on_update=FKRestraints.NO_ACTION)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer


with database.connection():
	Teams.create_table().execute()


@Table(database)
class DriverSessions:
	Id = Integer(primary_key=True)
	SessionResultId = Integer
	Position = Integer
	ClassificationPosition = Integer
	DriverId = ForeignKey(Drivers, nullable=True, on_update=FKRestraints.NO_ACTION)
	DriverName = String(nullable=True)
	TeamId = ForeignKey(Teams, nullable=True, on_update=FKRestraints.NO_ACTION)
	CarId = ForeignKey(Cars, nullable=True, on_update=FKRestraints.NO_ACTION)
	TeamName = String(nullable=True)
	SeatType = Integer
	Status = Integer
	TimeInt = Integer
	GapInt = Integer
	StintsRaw = String(nullable=True)
	FastestLapTimeInt = Integer
	FastestLapTyres = Integer(nullable=True)
	FastestLapNumLap = Integer
	FastestLapValidFlags = Integer
	PenaltySecsIngame = Integer
	PenaltyPosIngame = Integer
	PenaltySecsStewards = Integer
	PenaltyPosStewards = Integer
	PenaltyPoints = Integer
	DriverPointsRaw = Integer
	TeamPointsRaw = Integer
	IsLiveSource = Integer
	RaceNumber = Integer
	NationalityIngameId = Integer
	DriverNameIngame = String(nullable=True)
	LapsCount = Integer
	GridPosition = Integer
	PitsCount = Integer
	DriverSessionsDetailsRaw = Blob(nullable=True)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
	LiveId = Integer(nullable=True)


@Table(database)
class LineUps:
	Id = Integer(primary_key=True)
	LineupsBasedType = Integer
	SeatType = Integer
	TeamId = ForeignKey(Teams, nullable=True, on_update=FKRestraints.NO_ACTION)
	CarId = ForeignKey(Cars, nullable=True, on_update=FKRestraints.NO_ACTION)
	DriverId = ForeignKey(Drivers, nullable=True, on_update=FKRestraints.NO_ACTION)
	SeatPosition = Integer
	ReservePosition = Integer
	Badge = String(nullable=True)
	SeasonId = ForeignKey(Seasons, on_update=FKRestraints.NO_ACTION)
	CreatedAt = Integer
	UpdatedAt = Integer
	UserCreated = Integer
	UserUpdated = Integer
